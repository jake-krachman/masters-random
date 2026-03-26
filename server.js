const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const COUNT_FILE = process.env.COUNT_FILE || path.join(__dirname, "count.json");

function readCount() {
  try {
    const data = JSON.parse(fs.readFileSync(COUNT_FILE, "utf8"));
    return data.count || 0;
  } catch {
    return 0;
  }
}

function writeCount(count) {
  fs.writeFileSync(COUNT_FILE, JSON.stringify({ count }));
}

// Serve static files
app.use(express.static(__dirname, { index: "index.html" }));

// GET current count
app.get("/api/count", (req, res) => {
  res.json({ count: readCount() });
});

// POST to increment
app.post("/api/count", (req, res) => {
  const count = readCount() + 1;
  writeCount(count);
  res.json({ count });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
