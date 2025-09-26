const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/employees', (_req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;