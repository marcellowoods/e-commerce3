const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { currentUser, getOrCreateUser } = require("../controllers/auth");

// routes
router.post("/get-or-create-user", authCheck, getOrCreateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
