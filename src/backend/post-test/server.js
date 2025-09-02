// server.js
import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

// Simple POST route
app.post("/api/test", (req, res) => {
  console.log("POST body received:", req.body);
  res.json({ success: true, received: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
