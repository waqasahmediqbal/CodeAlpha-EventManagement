const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require('path')
const cors = require('cors');

app.use(cors());
connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Init Middleware
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

app.use("/api/user", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/events", require("./routes/api/events"));


app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
