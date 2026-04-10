const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "dist");
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

const metadata = {
  project: "CodeStream",
  buildTime: new Date().toISOString(),
  status: "build-success"
};

fs.writeFileSync(
  path.join(buildDir, "build-info.json"),
  JSON.stringify(metadata, null, 2),
  "utf-8"
);

console.log("Build artifact created at dist/build-info.json");
