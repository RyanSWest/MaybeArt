// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/test", (req, res) => {
  console.log("POST body received:", req.body);
  res.json({ success: true, received: req.body });
});

 
