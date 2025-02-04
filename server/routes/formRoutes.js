const express = require("express");
const { submitForm } = require("../controllers/FormController");
const upload = require("../middlewares/multerConfig");

const router = express.Router();

router.post("/submit", upload.single("resume"), submitForm);

module.exports = router;
