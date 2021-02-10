const Budget = require("./budget.model");

module.exports = function (sequelize, DataTypes) {
  const BudgetItem = sequelize.define("budgetItem", {
    itemName: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    frequency: {
      type: DataTypes.STRING,
    },
  });

  BudgetItem.associate = (models) => {
    BudgetItem.belongsTo(models.budget);
  };

  return BudgetItem;
};
