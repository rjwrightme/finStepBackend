// Requiring bcryptjs for password hashing
const bcrypt = require("bcryptjs");
const Budget = require("./budget.model");
const Account = require("./account.model");
const Category = require("./category.model");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
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
    User.hasMany(models.Budget);
    User.hasMany(models.Account);
    User.hasMany(models.Category);
  };

  // Check if unhashed password entered by the user matches hashed password in database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Before a User is created, hash their password
  User.addHook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
