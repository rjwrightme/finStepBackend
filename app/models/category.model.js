const User = require("./user.model");
const Transactions = require("./transactions.model");

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
    },
  });

  Category.associate = (models) => {
    Category.belongsTo(models.user);
    Category.belongsToMany(models.transactions, {
      through: "transactionCategory",
    });
  };

  return Category;
};
