import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("Auth APIs", () => {
  let accessToken;

  it("should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "fizzaalwani2978@gmail.com",
        password: "banafsha12."
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("accessToken");

    accessToken = res.body.accessToken;
  });

  it("should send OTP for forgot password", async () => {
    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({
        email: "fizzaalwani2978@gmail.com"
      });

    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
  });
});
