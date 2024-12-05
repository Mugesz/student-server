const express = require("express");
const router = express.Router();
const db = require("../DB/connection");

// GET all Departments
router.get("/", async (req, res) => {
  try {
    db.query("SELECT * FROM department", (err, results) => {
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

router.post("/create-dept", async (req, res) => {
  try {
    const { Name, Years, Duration, HodName, phone, DeptCode } = req.body;
    db.query((err, results) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ error: "Failed to check email." });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Email already registered." });
      }

      const query = `INSERT INTO Department
          (Name,Years,Duration,HodName,Phone, DeptCode) VALUES (?, ?, ?, ?, ?, ?)`;
    });

    const values = [Name, Years, Duration, HodName, phone, DeptCode];

    db.query(query, values, (err,result) =>{
        if (err) {
            console.error("Failed to insert student:", err);
            return res.status(500).json({ error: "Failed to insert student." });
          }
          res.status(201).json({
            message: "Department created successfully!",
          });
    })
  } catch (error) {
    console.error("Error creating Department:", error.message);
    res.status(500).json({ error: error.message });
  }
});
