const User = require("./user.model");
const BudgetItem = require("./budgetItem.model");

module.exports = function (sequelize, DataTypes) {
  const Budget = sequelize.define("budget", {
    budgetName: {
      type: DataTypes.STRING,
    },
  });

  Budget.associate = (models) => {
    Budget.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
    Budget.hasMany(models.budgetItem);
  };

  return Budget;
};
