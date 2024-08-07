const express =  require("express");
const { signupValidation, loginValidation } = require("../middlewares/validation");
const { signup, login } = require("../controllers/authcontroller");
const router = express.Router();


router.post("/login", loginValidation, login)
router.post("/signup", signupValidation, signup)

module.exports = router;