import { GoogleGenerativeAI } from "@google/generative-ai";
import readLineSync from "readline-sync";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function run() {
  console.log(process.env.GOOGLE_API_KEY);
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  console.log(colors.bold.green("Welcome to the Chatbot Program! "));
  console.log(colors.bold.green("You can start the chatting with the bot."));
  while (true) {
    const userInput = readLineSync.question(colors.yellow("You: "));
    if (userInput.toLowerCase() === "exit") {
      return;
    }
    const result = await model.generateContent(userInput);
    const response = result.response;
    const text = response.text();
    console.log(colors.green("Bot: ") + text);
  }
}

run();
