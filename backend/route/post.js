const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/employee', (req, res) => {
    const { name, email, department, joining_date, salary } = req.body;

    if (!name || !email || !department || !joining_date || !salary) {
        return res.status(400).json({ error: 'All Fields are required' });
    }

    const sql = "INSERT INTO employees (name, email, department, joining_date, salary) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, department, joining_date, salary], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Employee added successfully",
            employeeId: result.insertId
        });
    });
});

module.exports = router;    