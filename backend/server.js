const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require("path");
const db = require('./db');
const routes = require("./route/combine");

db.ping(err => {
    if (err) {
        console.error('DB not responding:', err.message);
    } else {
        console.log('DB Connection successful');
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", routes);
app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});