const User = require("./user.model");
const Transactions = require("./transactions.model");

module.exports = function (sequelize, DataTypes) {
  const Account = sequelize.define("Account", {
    name: {
      type: DataTypes.STRING,
    },
  });

  Account.associate = (models) => {
    Account.belongsTo(models.User);
    Account.hasMany(models.Transactions);
  };

  return Account;
};
