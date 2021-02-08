const User = require("./user.model");
const Transactions = require("./transactions.model");

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
    },
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User);
    Category.belongsToMany(models.Transactions, {
      through: "TransactionCategory",
    });
  };

  return Category;
};
