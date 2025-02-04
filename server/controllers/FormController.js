const Form = require("../models/FormModel.js");

const submitForm = async (req, res) => {
  try {
    const { fullName, emailAddress, phoneNumber, position, experience } = req.body;
    const resume = req.file ? `/uploads/${req.file.filename}` : null;

    if (!resume) {
      return res.status(400).json({ message: "Resume upload is required" });
    }

    const newFormEntry = new Form({ fullName, emailAddress, phoneNumber, position, experience, resume });
    await newFormEntry.save();
    console.log(newFormEntry);

    res.status(201).json({ message: "Form submitted successfully", data: newFormEntry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { submitForm };
