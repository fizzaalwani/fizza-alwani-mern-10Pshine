import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";
import userModel from '../src/models/user.js'
import crypto from "crypto";

let mongo;

describe("Full Backend API Tests", function () {
  this.timeout(10000);

  before(async () => {
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
  });

  after(async () => {
    await mongoose.disconnect();
    await mongo.stop();
  });

  describe("AUTH API", () => {

    it("should register user", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Test User",
          email: "test@test.com",
          password: "123456"
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("message");
    });

    it("should login user", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@test.com",
          password: "123456"
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("accessToken");
    });

    it("should send access token on the basis of refresh token", async () => {
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@test.com",
          password: "123456"
        });

      expect(loginRes.status).to.equal(200);
      expect(loginRes.body).to.have.property("refreshToken");

      const refreshToken = loginRes.body.refreshToken;

      const res = await request(app)
        .post("/api/auth/refresh-token")
        .send({ refreshToken });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("accessToken");
    });

    it("should generate otp for forgot-password", async () => {
      let res = await request(app)
        .post('/api/auth/forgot-password')
        .send({
          email: "test@test.com"
        })

      expect(res.status).to.equal(200)
      expect(res.body).to.be.an("object")
    })


    it("should reset password successfully", async () => {
      
      const forgotRes = await request(app)
        .post("/api/auth/forgot-password")
        .send({
          email: "test@test.com",
        });

      expect(forgotRes.status).to.equal(200);

      
      const user = await userModel.findOne({ email: "test@test.com" });

      expect(user).to.exist;
      expect(user.resetOTP).to.exist;

      //  Bruteforce OTP 
      // Since OTP is 6 digits, we regenerate until hash matches
      let otp;
      for (let i = 100000; i <= 999999; i++) {
        const hash = crypto.createHash("sha256").update(i.toString()).digest("hex");
        if (hash === user.resetOTP) {
          otp = i.toString();
          break;
        }
      }

      expect(otp).to.exist;

     
      const resetRes = await request(app)
        .post("/api/auth/reset-password")
        .send({
          email: "test@test.com",
          otp,
          newPassword: "newpassword123",
        });

      expect(resetRes.status).to.equal(200);
      expect(resetRes.body).to.have.property("message");
    });

  });

  describe("USER API", () => {
    let token;

    before(async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@test.com",
          password: "newpassword123"
        });

      token = res.body.accessToken;
    });

    it("should get profile", async () => {
      const res = await request(app)
        .get("/api/user/")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should update a profile", async () => {
      let res = await request(app)
        .post('/api/user/update')
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Fizza Zehra",
        })

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object")
    })
  });

  describe("NOTES API", () => {
    let token;
    let noteId;

    before(async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@test.com",
          password: "newpassword123"
        });

      token = res.body.accessToken;
    });

    it("should create note", async () => {
      const res = await request(app)
        .post("/api/notes/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Note",
          content: "Hello world"
        });

      expect(res.status).to.equal(201);
      noteId = res.body.note._id;
    });

    it("should get notes", async () => {
      const res = await request(app)
        .get("/api/notes/get")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });

    it("should get note by id", async () => {
      const res = await request(app)
        .get(`/api/notes/get/${noteId}`)
        .set("Authorization", `Bearer ${token}`)

      expect(res.status).to.be.equal(200)
      expect(res.body).to.be.an("object");

    })

    it("should update a note by id", async () => {
      let res = await request(app)
        .post(`/api/notes/update/${noteId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          content: "updated note content"
        })
    })

    it("should delete note", async () => {
      const res = await request(app)
        .post(`/api/notes/delete/${noteId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
    });
  });
});
