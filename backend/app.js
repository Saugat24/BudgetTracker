import express from "express";
import budgets from "./data/budget.js"
const app = express();
const PORT = 3000;
app.get("/budgets", (req, res) => {
    return res.json(budgets);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



