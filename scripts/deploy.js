const fs = require("fs");
const path = require("path");

const env = process.env.DEPLOY_ENV || "staging";
const buildInfoPath = path.join(__dirname, "..", "dist", "build-info.json");

if (!fs.existsSync(buildInfoPath)) {
  console.error("Missing build artifact. Run npm run build first.");
  process.exit(1);
}

const deployLog = {
  project: "CodeStream",
  environment: env,
  deployedAt: new Date().toISOString(),
  deployedBy: process.env.CI_JOB_NAME || "local-run",
  status: "deployment-success"
};

fs.writeFileSync(
  path.join(__dirname, "..", "dist", "deploy-log.json"),
  JSON.stringify(deployLog, null, 2),
  "utf-8"
);

console.log(`Mock deployment completed for environment: ${env}`);
