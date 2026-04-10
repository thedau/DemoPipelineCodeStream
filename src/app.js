const express = require("express");

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    service: "CodeStream",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/v1/message", (_req, res) => {
  res.status(200).json({
    title: "CodeStream CI/CD demo",
    message: "Pipeline is running automatically"
  });
});

module.exports = app;
