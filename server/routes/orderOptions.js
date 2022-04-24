const express = require("express");

const router = express.Router();

// middlewares
// const { authCheck } = require("../middlewares/auth");

// controllers
const {
    orderOptions
} = require("../controllers/orderOptions");

//route
router.get("/orderOptions", orderOptions);

module.exports = router;
