const pool = require("../db/pool");
const crypto = require("crypto");

exports.addEmployee = async (req, res) => {
  const data = req.body;
  const client = await pool.connect();
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    await client.query("BEGIN");

    // Generate user_id
    const user_id = crypto.randomInt(1000000000, 9999999999);

    // Insert into users
    const userQuery = `
      INSERT INTO users (user_id, username, email, password, role, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id;
    `;
    const userValues = [
      user_id,
      data.username,
      data.email,
      data.password,
      data.role,
      created_at,
    ];
    const userResult = await client.query(userQuery, userValues);
    const createdUserId = userResult.rows[0].user_id;

    // Insert into employees
    const employeeId = crypto.randomInt(1000000000, 9999999999);
    const date_of_birth = `${data.year}-${data.month}-${data.day}`;
    const joined_date = `${data.joined_year}-${data.joined_month}-${data.joined_day}`;

    const empQuery = `
      INSERT INTO employees (
        emp_id, first_name, middle_name, last_name, date_of_birth, gender, 
        phone_number, location, department_id, position_id, manager_id, 
        joined_date, employment_status, user_id
      ) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *;
    `;
    const empValues = [
      employeeId,
      data.first_name,
      data.middle_name,
      data.last_name,
      date_of_birth,
      data.gender,
      data.phone_number,
      data.location,
      data.department_id,
      data.position_id,
      data.manager_id,
      joined_date,
      data.employment_status,
      createdUserId,
    ];

    const empResult = await client.query(empQuery, empValues);

    await client.query("COMMIT");

    res.status(201).json({
      message: "Employee and user added successfully",
      employee: empResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error adding employee and user:", error);
    res.status(500).json({ error: "Server error, transaction failed" });
  } finally {
    client.release();
  }
};
