const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const candidateForm = require('./routes/candidateForm');

// import formRoutes from "./routes/formRoutes";
// Commenting out unused routes
// const employeeRoutes = require('./routes/employeeRoutes');
// const departmentRoutes = require('./routes/departmentRoutes');
// const leaveRoutes = require('./routes/leaveRoutes');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log requests to the console
app.use(express.json()); // Parse JSON bodies

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use("/uploads", express.static("uploads")); 
// app.use("/api/form", candidateForm);
// Commenting out unused routes
// app.use('/api/employees', employeeRoutes);
// app.use('/api/departments', departmentRoutes);
// app.use('/api/leaves', leaveRoutes);

// Error handling middleware (to catch any errors that occur)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
