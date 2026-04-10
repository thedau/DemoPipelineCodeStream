const request = require("supertest");
const app = require("../src/app");

describe("CodeStream API", () => {
  it("GET /health returns service status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.service).toBe("CodeStream");
    expect(response.body.status).toBe("ok");
    expect(response.body.timestamp).toBeDefined();
  });

  it("GET /api/v1/message returns CI/CD message", async () => {
    const response = await request(app).get("/api/v1/message");

    expect(response.statusCode).toBe(200);
    expect(response.body.version).toBe("1.0.0");
    expect(response.body.title).toBe("CodeStream CI/CD demo");
  });
});
