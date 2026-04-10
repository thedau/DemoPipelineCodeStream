const fs = require("fs");
const path = require("path");

const env = process.env.DEPLOY_ENV || "production";
const reason = process.env.ROLLBACK_REASON || "deployment-failed";

const rollbackLog = {
  project: "CodeStream",
  environment: env,
  rollbackAt: new Date().toISOString(),
  reason,
  status: "rollback-success"
};

const distDir = path.join(__dirname, "..", "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(
  path.join(distDir, "rollback-log.json"),
  JSON.stringify(rollbackLog, null, 2),
  "utf-8"
);

console.log(`Rollback mock completed for environment: ${env}`);
