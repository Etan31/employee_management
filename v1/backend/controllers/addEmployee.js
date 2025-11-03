const pool = require("../db/pool");
const crypto = require("crypto");

exports.addEmployee = async (req, res) => {
  const data = req.body;

  try {
    const employeeId = crypto.randomInt(1000000000, 9999999999);

    const date_of_birth = `${data.year}-${data.month}-${data.day}`;
    const joined_date = `${data.joined_year}-${data.joined_month}-${data.joined_day}`;

    const query = `INSERT INTO employees (emp_id, first_name, middle_name, last_name, date_of_birth, gender, email, phone_number, location, department_id, position_id, manager_id, joined_date, employment_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) 
     RETURNING *; `;
    const values = [
      employeeId,
      data.first_name,
      data.middle_name,
      data.last_name,
      date_of_birth,
      data.gender,
      data.email,
      data.phone_number,
      data.location,
      data.department_id,
      data.position_id,
      data.manager_id,
      joined_date,
      data.employment_status,
    ];
    const result = await pool.query(query, values);
    res.status(201).json({
      message: "Employee added successfully",
      employee: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding employees:", error);
    res.status(500).json({ error: "Server error" });
  }
};
