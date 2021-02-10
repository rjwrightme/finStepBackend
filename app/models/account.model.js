const User = require("./user.model");
const Transactions = require("./transactions.model");

module.exports = function (sequelize, DataTypes) {
  const Account = sequelize.define("account", {
    name: {
      type: DataTypes.STRING,
    },
  });

  Account.associate = (models) => {
    Account.belongsTo(models.user);
    Account.hasMany(models.transactions);
  };

  return Account;
};
