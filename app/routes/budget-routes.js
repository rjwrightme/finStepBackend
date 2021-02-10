const db = require("../models");

module.exports = (budget) => {
  // New Budget Route
  budget.post("/api/new-budget", (req, res) => {
    db.Budget.create({
      budgetName: "mainBudget",
      userId: req.body.userId,
    })
      .then((dbResponse) => {
        res.json(dbResponse);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // New BudgetItem Route
  budget.post("/api/new-budget-item", (req, res) => {
    db.BudgetItem.create({
      itemName: req.body.itemName,
      type: req.body.type,
      amount: req.body.amount,
      frequency: req.body.frequency,
    })
      .then(() => {
        res.json({
          itemName: req.body.itemName,
          type: req.body.type,
          amount: req.body.amount,
          frequency: req.body.frequency,
        });
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Get All BudgetItems
  budget.get("/api/budget-list", (req, res) => {
    db.BudgetItem.findAll({}).then((budgetItems) => {
      res.json(budgetItems);
    });
  });
};
