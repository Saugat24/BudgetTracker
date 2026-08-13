import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const analyseSpending = async (req, res) => {
  try {
    const { transactions, month } = req.body;
    if (!transactions?.length) {
      return res.status(400).json({ error: "No transactions provided" });
    }

    const summary = transactions.reduce(
      (acc, t) => {
        if (t.type === "income") acc.income += t.amount;
        else {
          acc.expenses += t.amount;
          acc.byCategory[t.category] = (acc.byCategory[t.category] || 0) + t.amount;
        }
        return acc;
      },
      { income: 0, expenses: 0, byCategory: {} }
    );

    const categoryBreakdown = Object.entries(summary.byCategory)
      .map(([cat, amt]) => `  - ${cat}: Rs. ${amt}`)
      .join("\n");

    const prompt = `You are a financial advisor. Analyse this spending data for ${month || "the selected period"} and provide concise, actionable advice.

Financial Summary:
- Total Income: Rs. ${summary.income}
- Total Expenses: Rs. ${summary.expenses}
- Net Balance: Rs. ${summary.income - summary.expenses}

Expense Breakdown by Category:
${categoryBreakdown || "  - No categorised expenses"}

Transactions (${transactions.length} total):
${transactions.map((t) => `  - [${t.type}] ${t.category}: Rs. ${t.amount} — ${t.description || "no description"}`).join("\n")}

Provide 4-6 bullet points of specific, practical financial advice based on this data. Focus on spending patterns, savings opportunities, and budget improvements. Be direct and specific to the numbers shown.`;

    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });
    const advice = result.choices[0].message.content;

    res.json({ advice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
