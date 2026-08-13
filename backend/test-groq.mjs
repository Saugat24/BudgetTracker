import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
console.log("KEY present:", !!process.env.GROQ_API_KEY);
console.log("KEY value:", process.env.GROQ_API_KEY?.slice(0, 10) + "...");

try {
  const r = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: "Say OK" }],
  });
  console.log("SUCCESS:", r.choices[0].message.content);
} catch (e) {
  console.error("ERROR:", e.message);
  console.error("STATUS:", e.status);
}
