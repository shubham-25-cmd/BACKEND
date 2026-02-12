const express = require("express");
const router = express.Router();   // ✅ MUST be before using router
const authcontroller=require("../controllers/auth.controllers")
router.post("/register", authcontroller.registerController);


router.post("/login",authcontroller.logginController)

module.exports = router;
