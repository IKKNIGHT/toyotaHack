import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

// Your curated questions - these will always be used
const TOYOTA_QUESTIONS = [
  {
    id: "vibe",
    question: "If your car were a partner, what kind of energy would you vibe with?",
    options: [
      "Loyal & dependable — gets me through anything",
      "Stylish & fun — keeps life exciting",
      "Smart & efficient — makes every mile count",
      "Adventurous — ready for any detour"
    ]
  },
  {
    id: "commute",
    question: "How far are you willing to 'drive for a date' (aka your daily commute)?",
    options: [
      "We live in the same neighborhood (under 10 miles)",
      "Short drive — worth it (10–30 miles)",
      "It's complicated (30–50 miles)",
      "Long-distance relationship (50+ miles)"
    ]
  },
  {
    id: "budget",
    question: "What kind of relationship are you ready to commit to… financially?",
    options: [
      "Keeping it chill (under $25k)",
      "Serious but stable ($25k–$35k)",
      "Ready to invest in something nice ($35k–$45k)",
      "All-in for luxury & performance ($45k+)"
    ]
  },
  {
    id: "lifestyle",
    question: "Your weekends usually look like…",
    options: [
      "Cafes, city strolls, and errands",
      "Beach trips, hikes, and mini adventures",
      "Home projects or family hangouts",
      "Late-night drives and road playlists"
    ]
  },
  {
    id: "tech_savvy",
    question: "How important is it that your car 'gets you' (tech + AI + features)?",
    options: [
      "Don't care — just start and go",
      "Nice to have — a few smart features are cool",
      "Essential — I want my car to think with me",
      "Must-have — I need cutting-edge everything"
    ]
  },
  {
    id: "future_family",
    question: "Do you see more passengers in your future (family, friends, pets)?",
    options: [
      "Just me, myself, and I",
      "A partner or roommate situation",
      "Full carpool vibes soon",
      "Already chauffeuring the crew"
    ]
  },
  {
    id: "personality",
    question: "Pick the word that feels most like your driving personality:",
    options: [
      "Chill — slow lanes and podcasts",
      "Efficient — minimal fuel, max focus",
      "Bold — love to lead the pack",
      "Curious — new routes every weekend"
    ]
  },
  {
    id: "green",
    question: "Would you date a car that's electric or hybrid?",
    options: [
      "Totally — love a green partner",
      "Maybe — depends on convenience",
      "Not yet — gas is still my comfort zone"
    ]
  },
  {
    id: "parking",
    question: "How do you feel about parking situations?",
    options: [
      "Tight city spots? No problem.",
      "Prefer open suburban lots",
      "Avoid downtown like it's an ex"
    ]
  },
  {
    id: "dealbreaker",
    question: "What's your biggest dealbreaker in a car?",
    options: [
      "Bad mileage — I like long drives",
      "Tiny trunk — I pack for everything",
      "Outdated tech — can't live without CarPlay",
      "Boring look — I need style"
    ]
  }
];

const FALLBACK_CARS = [
  {
    id: 1,
    name: "Toyota Corolla Hybrid",
    image: "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/corolla/1H0/1.png",
    description: "Fuel-efficient compact perfect for city driving and daily commutes.",
    msrp: 24500,
    mpg: 52,
    leaseMonthly: 249
  },
  {
    id: 2,
    name: "Toyota RAV4 Hybrid",
    image: "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/rav4/1H0/1.png",
    description: "Versatile SUV with great fuel economy and ample space for families.",
    msrp: 31500,
    mpg: 40,
    leaseMonthly: 329
  },
  {
    id: 3,
    name: "Toyota Camry Hybrid",
    image: "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/camry/1H0/1.png",
    description: "Comfortable midsize sedan with excellent fuel efficiency and smooth ride.",
    msrp: 28500,
    mpg: 48,
    leaseMonthly: 299
  },
  {
    id: 4,
    name: "Toyota Prius",
    image: "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/prius/1H0/1.png",
    description: "Iconic hybrid with exceptional fuel economy and modern styling.",
    msrp: 27500,
    mpg: 57,
    leaseMonthly: 279
  },
  {
    id: 5,
    name: "Toyota Highlander Hybrid",
    image: "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/highlander/1H0/1.png",
    description: "Spacious three-row SUV perfect for growing families and road trips.",
    msrp: 39500,
    mpg: 36,
    leaseMonthly: 429
  }
];

// ============= 1️⃣ Get Toyota Lifestyle Questions ==================
app.get("/api/questions", async (req, res) => {
  try {
    console.log(`✅ Returning ${TOYOTA_QUESTIONS.length} curated Toyota lifestyle questions`);
    res.json(TOYOTA_QUESTIONS);
  } catch (err) {
    console.error("❌ Error returning questions:", err.message);
    res.json(TOYOTA_QUESTIONS); // Still return the questions even on error
  }
});

// ============= 2️⃣ Match Cars Based on Answers ==================
app.post("/api/match", async (req, res) => {
  const { answers } = req.body;
  if (!answers) return res.status(400).json({ error: "Missing answers" });

  console.log("📩 Received answers from frontend:", answers);

  try {
    const prompt = `
You are a Toyota sales AI. Based on these user preferences:
${JSON.stringify(answers, null, 2)}

Recommend 5 Toyota vehicles that fit best.
For each, include:
- name (exact Toyota model name)
- image (use official Toyota CDN URLs from toyota.com)
- description (2 short sentences max)
- msrp (reasonable number)
- mpg (realistic number)
- leaseMonthly (reasonable monthly lease estimate)

Respond ONLY in pure JSON array format, no text, no comments.
Example format:
[
  {
    "id": 1,
    "name": "Toyota RAV4 Hybrid",
    "image": "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/rav4/1H0/1.png",
    "description": "A balanced SUV great for families. Offers excellent fuel economy and versatile space.",
    "msrp": 31000,
    "mpg": 40,
    "leaseMonthly": 320
  }
]

IMPORTANT: Return ONLY the JSON array, no other text.
`;

    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    });

    let jsonText = completion.choices[0].message.content.trim();
    console.log("Raw AI output:", jsonText);

    // Clean the response
    jsonText = jsonText
      .replace(/```json|```/g, "")
      .replace(/\$|USD|Price TBD|TBD|approx\.?|N\/A/gi, "")
      .replace(/:\s*This configuration.*?(,|\})/gi, ': ""$1')
      .trim();

    // Extract only JSON array part
    const startIdx = jsonText.indexOf("[");
    const endIdx = jsonText.lastIndexOf("]");
    if (startIdx === -1 || endIdx === -1) {
      console.warn("No JSON array detected in AI output, using fallback cars");
      return res.json({ results: FALLBACK_CARS });
    }
    
    jsonText = jsonText.substring(startIdx, endIdx + 1);

    // Attempt to safely parse
    let results;
    try {
      results = JSON.parse(jsonText);
    } catch (e) {
      console.warn("JSON parse failed, attempting auto-repair...");
      try {
        const repaired = jsonText
          .replace(/,(\s*[}\]])/g, "$1")
          .replace(/(\d+)\s*mpg/gi, '"mpg":$1')
          .replace(/\s+/g, " ")
          .replace(/"msrp":\s*"(\d+)"/g, '"msrp": $1')
          .replace(/"mpg":\s*"(\d+)"/g, '"mpg": $1')
          .replace(/"leaseMonthly":\s*"(\d+)"/g, '"leaseMonthly": $1');
        results = JSON.parse(repaired);
      } catch (repairError) {
        console.warn("JSON repair failed, using fallback cars");
        results = FALLBACK_CARS;
      }
    }

    // Ensure each car has an ID
    results = results.map((car, index) => ({
      id: car.id || index + 1,
      name: car.name,
      image: car.image,
      description: car.description,
      msrp: car.msrp,
      mpg: car.mpg,
      leaseMonthly: car.leaseMonthly
    }));

    console.log(`✅ Parsed ${results.length} Toyota recommendations`);
    res.json({ results });
  } catch (err) {
    console.error("❌ Match generation failed:", err.message);
    res.json({ results: FALLBACK_CARS });
  }
});

// ============= 3️⃣ AI Car Comparison Endpoint ==================
app.post("/api/compare", async (req, res) => {
  const { cars } = req.body;
  
  if (!cars || !Array.isArray(cars) || cars.length < 2) {
    return res.status(400).json({ error: "Please provide at least 2 cars to compare" });
  }

  console.log("🔍 Comparing cars:", cars.map(c => c.name));

  try {
    // Calculate additional cost metrics
    const car1 = calculateAdditionalCosts(cars[0]);
    const car2 = calculateAdditionalCosts(cars[1]);

    const prompt = `
You are a Toyota financial and lifestyle expert. Compare these two Toyota vehicles in detail:

CAR 1: ${car1.name}
- MSRP: $${car1.msrp}
- MPG: ${car1.mpg}
- Lease: $${car1.leaseMonthly}/month
- Estimated Annual Insurance: $${car1.annualInsurance}
- Estimated Annual Maintenance: $${car1.annualMaintenance}
- 5-Year Total Cost: $${car1.fiveYearCost}
- Description: ${car1.description}

CAR 2: ${car2.name}  
- MSRP: $${car2.msrp}
- MPG: ${car2.mpg}
- Lease: $${car2.leaseMonthly}/month
- Estimated Annual Insurance: $${car2.annualInsurance}
- Estimated Annual Maintenance: $${car2.annualMaintenance}
- 5-Year Total Cost: $${car2.fiveYearCost}
- Description: ${car2.description}

Provide a comprehensive comparison covering:

💰 **FINANCIAL ANALYSIS:**
- Upfront cost comparison (MSRP)
- Long-term value (5-year total cost)
- Insurance and maintenance costs
- Fuel savings based on MPG difference
- Best value for money

🛡️ **INSURANCE & MAINTENANCE:**
- Why insurance costs differ between these models
- Expected maintenance requirements
- Reliability factors

🎯 **LIFESTYLE FIT:**
- Best use cases for each vehicle
- Family considerations
- Commuting vs adventure suitability
- Resale value prospects

📊 **RECOMMENDATION:**
- Clear guidance on who should choose which vehicle
- Financial trade-offs
- Lifestyle compatibility

Format your response in clear, conversational paragraphs with clear section headings. Be specific and data-driven in your analysis.
`;

    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const comparison = completion.choices[0].message.content.trim();
    
    console.log("AI comparison generated successfully");
    res.json({ 
      comparison,
      costBreakdown: {
        car1: {
          name: car1.name,
          annualInsurance: car1.annualInsurance,
          annualMaintenance: car1.annualMaintenance,
          fiveYearCost: car1.fiveYearCost
        },
        car2: {
          name: car2.name,
          annualInsurance: car2.annualInsurance,
          annualMaintenance: car2.annualMaintenance,
          fiveYearCost: car2.fiveYearCost
        }
      }
    });
    
  } catch (err) {
    console.error("AI comparison failed:", err.message);
    
    // Enhanced fallback comparison with cost analysis
    const car1 = calculateAdditionalCosts(cars[0]);
    const car2 = calculateAdditionalCosts(cars[1]);
    
    const fallbackComparison = `**Comprehensive Comparison: ${car1.name} vs ${car2.name}**

💰 **FINANCIAL BREAKDOWN:**

**${car1.name}:**
- MSRP: $${car1.msrp?.toLocaleString()}
- Annual Insurance: ~$${car1.annualInsurance}
- Annual Maintenance: ~$${car1.annualMaintenance}
- 5-Year Total Cost: ~$${car1.fiveYearCost?.toLocaleString()}

**${car2.name}:**
- MSRP: $${car2.msrp?.toLocaleString()}
- Annual Insurance: ~$${car2.annualInsurance}
- Annual Maintenance: ~$${car2.annualMaintenance}
- 5-Year Total Cost: ~$${car2.fiveYearCost?.toLocaleString()}

🛡️ **INSURANCE & MAINTENANCE:**
${car1.annualInsurance < car2.annualInsurance ? 
  `• **Lower Insurance**: ${car1.name} saves ~$${car2.annualInsurance - car1.annualInsurance}/year on insurance` :
  `• **Lower Insurance**: ${car2.name} saves ~$${car1.annualInsurance - car2.annualInsurance}/year on insurance`}

${car1.annualMaintenance < car2.annualMaintenance ?
  `• **Lower Maintenance**: ${car1.name} saves ~$${car2.annualMaintenance - car1.annualMaintenance}/year on maintenance` :
  `• **Lower Maintenance**: ${car2.name} saves ~$${car1.annualMaintenance - car2.annualMaintenance}/year on maintenance`}

🎯 **LIFESTYLE RECOMMENDATION:**
Choose **${car1.name}** if you prioritize ${getBestFor(car1.name).toLowerCase()}, or **${car2.name}** for ${getBestFor(car2.name).toLowerCase()}.

${car1.fiveYearCost < car2.fiveYearCost ?
  `💡 **Best Value**: ${car1.name} offers better long-term value, saving ~$${car2.fiveYearCost - car1.fiveYearCost} over 5 years` :
  `💡 **Best Value**: ${car2.name} offers better long-term value, saving ~$${car1.fiveYearCost - car2.fiveYearCost} over 5 years`}`;

    res.json({ 
      comparison: fallbackComparison,
      costBreakdown: {
        car1: {
          name: car1.name,
          annualInsurance: car1.annualInsurance,
          annualMaintenance: car1.annualMaintenance,
          fiveYearCost: car1.fiveYearCost
        },
        car2: {
          name: car2.name,
          annualInsurance: car2.annualInsurance,
          annualMaintenance: car2.annualMaintenance,
          fiveYearCost: car2.fiveYearCost
        }
      }
    });
  }
});

// Helper function to calculate additional costs
function calculateAdditionalCosts(car) {
  const name = car.name.toLowerCase();
  
  // Insurance calculation based on vehicle type and MSRP
  let insuranceMultiplier;
  if (name.includes('corolla') || name.includes('prius') || name.includes('camry')) {
    insuranceMultiplier = 0.08; // Lower insurance for sedans
  } else if (name.includes('rav4') || name.includes('venza')) {
    insuranceMultiplier = 0.10; // Medium for compact SUVs
  } else if (name.includes('highlander') || name.includes('4runner')) {
    insuranceMultiplier = 0.12; // Higher for larger SUVs
  } else if (name.includes('tacoma') || name.includes('tundra')) {
    insuranceMultiplier = 0.13; // Highest for trucks
  } else {
    insuranceMultiplier = 0.09; // Default
  }
  
  // Maintenance calculation
  let maintenanceMultiplier;
  if (name.includes('hybrid')) {
    maintenanceMultiplier = 0.015; // Lower maintenance for hybrids
  } else {
    maintenanceMultiplier = 0.020; // Standard maintenance
  }
  
  const annualInsurance = Math.round(car.msrp * insuranceMultiplier);
  const annualMaintenance = Math.round(car.msrp * maintenanceMultiplier);
  
  // 5-year total cost: MSRP + (insurance + maintenance + fuel) * 5 years
  // Assuming 12,000 miles/year and $3.50/gallon for fuel
  const annualFuelCost = Math.round((12000 / car.mpg) * 3.5);
  const fiveYearCost = car.msrp + ((annualInsurance + annualMaintenance + annualFuelCost) * 5);
  
  return {
    ...car,
    annualInsurance,
    annualMaintenance,
    annualFuelCost,
    fiveYearCost: Math.round(fiveYearCost)
  };
}

// Helper function for lifestyle recommendations
function getBestFor(carName) {
  const name = carName.toLowerCase();
  if (name.includes('corolla') || name.includes('prius')) return 'City Driving & Fuel Efficiency';
  if (name.includes('camry') || name.includes('crown')) return 'Commuting & Comfort';
  if (name.includes('rav4') || name.includes('venza')) return 'Family & Adventure';
  if (name.includes('highlander') || name.includes('sienna')) return 'Large Families & Road Trips';
  if (name.includes('4runner') || name.includes('tacoma')) return 'Off-road & Utility';
  return 'Daily Driving & Versatility';
}

// ============= 4️⃣ Health Check Endpoint ==================
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Toyota AI backend is running",
    timestamp: new Date().toISOString()
  });
});

// ================== Start Server ==================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Toyota AI backend running on http://localhost:${PORT}`)
);