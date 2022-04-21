const express = require("express");

const router = express.Router();

// middlewares
// const { authCheck } = require("../middlewares/auth");

// controllers
const {
    sendMessage
} = require("../controllers/messages");

//route
router.post("/message", sendMessage);

module.exports = router;
