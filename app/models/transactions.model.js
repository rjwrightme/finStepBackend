const Account = require("./account.model");
const Category = require("./category.model");

module.exports = function (sequelize, DataTypes) {
  const Transactions = sequelize.define("transactions", {
    name: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
  });

  Transactions.associate = (models) => {
    Transactions.belongsTo(models.account);
    Transactions.belongsToMany(models.category, {
      through: "transactionCategory",
    });
  };

  return Transactions;
};
