const express = require("express");
const cors = require("cors");
const app = express();

// Import route files
const studentRoutes = require("./routes/student");
const DepartmentRoutes = require("./routes/Department");
const loginRoutes = require("./routes/login");

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use("/students", studentRoutes);
app.use("/login", loginRoutes); 
app.use("/department", DepartmentRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
