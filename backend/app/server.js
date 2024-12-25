const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const rateLimiter = require("./middleware/rateLimiter");
const interestCalculatorRoutes = require('./features/interest-calculator/routes');
const fdRdCalculatorRoutes = require('./features/fd-rd-calculator/routes');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimiter);

// Routes
app.use("/api/auth", authRoutes);

// Interest Calculator
app.use('/api/interest', interestCalculatorRoutes);

// Add FD/RD routes
app.use('/api/fd-rd', fdRdCalculatorRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
