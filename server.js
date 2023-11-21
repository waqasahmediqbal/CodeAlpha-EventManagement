const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require('path')

connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Init Middleware
app.use(express.json({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
const PORT = process.env.PORT || 5000;

app.use("/api/user", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/events", require("./routes/api/events"));


app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
