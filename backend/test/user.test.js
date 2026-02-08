import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("User Profile APIs", () => {
  let token;

  before(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123"
      });

    token = res.body.accessToken;
  });

  it("should get user profile", async () => {
    const res = await request(app)
      .get("/api/user/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.user).to.have.property("email");
  });

  it("should update profile", async () => {
    const res = await request(app)
      .post("/api/user/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Name" });

    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
  });
});
