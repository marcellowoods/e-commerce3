const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers

const {
    createOrder
} = require("../controllers/orders");

router.post("/order", createOrder); 

module.exports = router;
