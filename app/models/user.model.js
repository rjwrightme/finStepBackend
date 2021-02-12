const Budget = require("./budget.model");
const Account = require("./account.model");
const Category = require("./category.model");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.budget);
    User.hasMany(models.account);
    User.hasMany(models.category);
  };

  return User;
};
