const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Monster } = require("../models");
require("dotenv").config();

const gemini = async (prompt) => {
  try {
    const lowerCasePrompt = prompt.toLowerCase();

    let species = null;
    if (lowerCasePrompt.includes("elder dragon")) {
      species = "elder dragon";
    } else if (lowerCasePrompt.includes("flying wyvern")) {
      species = "flying wyvern";
    } else if (lowerCasePrompt.includes("fanged beast")) {
      species = "fanged beast";
    } else if (lowerCasePrompt.includes("piscine wyvern")) {
      species = "piscine wyvern";
    } else if (lowerCasePrompt.includes("neopteron")) {
      species = "neopteron";
    } else if (lowerCasePrompt.includes("relict")) {
      species = "relict";
    } else if (lowerCasePrompt.includes("brute wyvern")) {
      species = "brute wyvern";
    } else if (lowerCasePrompt.includes("herbivore")) {
      species = "herbivore";
    } else if (lowerCasePrompt.includes("fanged wyvern")) {
      species = "fanged wyvern";
    } else if (lowerCasePrompt.includes("fish")) {
      species = "fish";
    } else if (lowerCasePrompt.includes("wingdrake")) {
      species = "wingdrake";
    } else if (lowerCasePrompt.includes("bird wyvern")) {
      species = "bird wyvern";
    }

    if (species) {
      const monsters = await Monster.findAll({
        where: { species },
        limit: 3,
      });

      if (monsters.length > 0) {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const descriptions = [];
        for (const monster of monsters) {
          const result = await model.generateContent(
            // `${monster.name} `
            `Give short description to  ${monster.name} `
            // `Describe the characteristics of ${monster.name}`
          );
          const description = result.response.text();
          descriptions.push(`${monster.name}: ${description}`);
        }

        return descriptions.join("\n");
      }
    }
  } catch (err) {
    console.error("Error generating content:", err);
    throw err;
  }
};

module.exports = gemini;
