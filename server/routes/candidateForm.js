const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/FormController');
const upload = require('../middlewares/multerConfig');

// Define the route
router.post("/submit", upload.single("resume"), submitForm);

module.exports = router;
