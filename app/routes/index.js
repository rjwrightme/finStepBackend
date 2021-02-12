const path = require("path");
const router = require("express").Router();
const userRoutes = require("./user-routes");
const budgetRoutes = require("./budget-routes");

// API Routes
router.use(userRoutes);
// router.use(budgetRoutes);

module.exports = router;
