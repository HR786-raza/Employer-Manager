const express = require('express');
const db = require('../db');
const router = express.Router();

router.delete("/employee/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM projects WHERE employee_id = ?", [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        if (rows.length > 0) {
            return res.status(400).json({ error: "Cannot delete employee with assigned projects" });
        }

        db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: "Employee not found" });

            res.json({ message: "Employee deleted successfully" });
        });
    });
});


module.exports = router;