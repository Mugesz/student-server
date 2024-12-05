const express = require("express");
const router = express.Router();
const db = require("../DB/connection"); // Import the database connection


// GET all students
router.get("/", async (req, res) => {
  try {
    db.query("SELECT * FROM studentDetails", (err, results) => {
      if (err) {
        throw new Error("Database query failed."); // Throw an error to be caught by the catch block
      }
      res.json(results); // Send the retrieved data as JSON
    });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST route to create a student
router.post("/create-students", async (req, res) => {
  const {
    NAME,
    GENDER,
    Age,
    Course,
    Dept,
    Email,
    Phone,
    RollNumber,
    Joining,
    Address,
    Stay,
    EmergencyDetails,
    FeesDetails,
    Image,
    Username,
    Password,
  } = req.body;

  // Validation to ensure required fields are provided
  if (!NAME || !GENDER || !Age || !Course || !Dept || !Email || !Phone || !RollNumber || !Username || !Password) {
    return res.status(400).json({ error: "All required fields must be provided." });
  }

  // Check if the Email already exists
  const checkEmailQuery = "SELECT * FROM studentDetails WHERE Email = ?";
  
  try {
    db.query(checkEmailQuery, [Email], (err, results) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ error: "Failed to check email." });
      }
      
      // If the email already exists, send a response
      if (results.length > 0) {
        return res.status(400).json({ error: "Email already registered." });
      }

      // Proceed with the insertion if the email is not taken
      const query = `
        INSERT INTO studentDetails 
        (NAME, GENDER, Age, Course, Dept, Email, Phone, RollNumber, Joining, Address, Stay, EmergencyDetails, FeesDetails, Image, Username, Password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        NAME,
        GENDER,
        Age,
        Course,
        Dept,
        Email,
        Phone,
        RollNumber,
        Joining,
        Address,
        Stay,
        EmergencyDetails,
        FeesDetails,
        Image,
        Username,
        Password,
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Failed to insert student:", err);
          return res.status(500).json({ error: "Failed to insert student." });
        }
        res.status(201).json({
          message: "Student created successfully!",
          studentId: result.insertId,
        });
      });
    });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
