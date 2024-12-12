const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// MySQL connection setup
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "syedumer", // Your password
  database: "HMS", // Your database name
});

// GET doctors without departments
app.get("/doctorsWithoutDepartments", (req, res) => {
  const query = "SELECT email, name FROM doctor WHERE department_id IS NULL";
  con.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching doctors without departments:", err.message);
      return res.status(500).json({ error: "Failed to fetch doctors." });
    }
    res.json(results);
  });
});

// GET departments
app.get("/departments", (req, res) => {
  const query = "SELECT id, name FROM department";
  con.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching departments:", err.message);
      return res.status(500).json({ error: "Failed to fetch departments." });
    }
    res.json(results);
  });
});

con.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

app.listen(3001, () => {
  console.log(`Listening on port 3001 `);
});
