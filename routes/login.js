const express = require("express");
const db = require("../DB/connection"); // Import the database connection
const router = express.Router();

// Login Route
router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    // Query the database to find the student
    const query = "SELECT * FROM studentDetails WHERE Username = ? AND Password = ?";
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Internal server error." });
      }

      // Check if any record matches
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      // Login successful - return student details
      const student = results[0];
      res.status(200).json({
        message: "Login successful!",
        studentDetails: {
          id: student.ID,
          username: student.Username,
          name: student.Name,
          course: student.Course,
          dept: student.Dept,
        },
      });
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
