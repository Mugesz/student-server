const mysql = require("mysql2");

// Create a database connection
const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mugesh@123",
  database: "students", // Replace with your database name
});

// Connect to the database
connect.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = connect;
