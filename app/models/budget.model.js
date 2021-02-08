const User = require("./user.model");
const BudgetItem = require("./budgetItem.model");

module.exports = function (sequelize, DataTypes) {
  const Budget = sequelize.define("Budget", {
    budgetName: {
      type: DataTypes.STRING,
    },
  });

  Budget.associate = (models) => {
    Budget.belongsTo(models.User);
    Budget.hasMany(models.BudgetItem);
  };

  return Budget;
};
