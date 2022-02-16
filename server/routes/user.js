const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
    getOrders,
} = require("../controllers/user");

//routes
//TODO
// router.post("/user/address", authCheck, saveAddress);
router.get("/user/orders", authCheck, getOrders);

module.exports = router;
