const db = require("../models");

module.exports = (budget) => {
  // New Budget Route
  budget.post("/api/new-budget", (req, res) => {
    db.budget
      .create({
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
    db.budgetItem
      .create({
        itemName: req.body.itemName,
        type: req.body.type,
        amount: req.body.amount,
        frequency: req.body.frequency,
        budgetId: req.body.budgetId,
      })
      .then(() => {
        res.json({
          itemName: req.body.itemName,
          type: req.body.type,
          amount: req.body.amount,
          frequency: req.body.frequency,
          budgetId: req.body.budgetId,
        });
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Get BudgetId
  budget.get("/api/budget/:userId", (req, res) => {
    db.budget
      .findOne({
        where: {
          userId: req.params.userId,
        },
      })
      .then((budget) => res.json(budget));
  });

  // Get All BudgetItems
  budget.get("/api/budget-list", (req, res) => {
    db.budgetItem.findAll({}).then((budgetItems) => {
      res.json(budgetItems);
    });
  });
};
