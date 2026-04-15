const chai = require("chai");
const request = require("supertest");
const app = require("../app");
const { calculateSum } = require("../calculator");

const { expect } = chai;

describe("calculateSum", () => {
  it("adds two valid numbers", () => {
    expect(calculateSum(10, 15)).to.equal(25);
  });

  it("handles decimal values", () => {
    expect(calculateSum(2.5, 3.1)).to.equal(5.6);
  });

  it("throws an error for invalid input", () => {
    expect(() => calculateSum("abc", 5)).to.throw("Please provide two valid numbers.");
  });
});

describe("GET /api/add", () => {
  it("returns the sum for valid query parameters", async () => {
    const response = await request(app).get("/api/add?a=7&b=8");

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      success: true,
      result: 15,
    });
  });

  it("returns 400 when a query parameter is missing", async () => {
    const response = await request(app).get("/api/add?a=7");

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.error).to.equal("Please provide two valid numbers.");
  });

  it("returns 400 for invalid query parameters", async () => {
    const response = await request(app).get("/api/add?a=hello&b=8");

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.error).to.equal("Please provide two valid numbers.");
  });
});
