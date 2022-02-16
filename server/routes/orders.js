const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
    createOrder,
    userCreateOrder
} = require("../controllers/orders");

//route
router.post("/order", createOrder);
router.post("/user-order", authCheck, userCreateOrder);  

module.exports = router;
