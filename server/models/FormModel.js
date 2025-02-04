const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  resume: { type: String, required: true }, // Store file path
}, { timestamps: true });

const Form = mongoose.model("Form", formSchema);
module.exports = { Form };
