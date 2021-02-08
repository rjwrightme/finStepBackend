const Account = require("./account.model");
const Category = require("./category.model");

module.exports = function (sequelize, DataTypes) {
  const Transactions = sequelize.define("Transactions", {
    name: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
  });

  Transactions.associate = (models) => {
    Transactions.belongsTo(models.Account);
    Transactions.belongsToMany(models.Category, {
      through: "TransactionCategory",
    });
  };

  return Transactions;
};
