import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("Notes APIs", () => {
  let token;
  let noteId;

  before(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123"
      });

    token = res.body.accessToken;
  });

  it("should create a note", async () => {
    const res = await request(app)
      .post("/api/notes/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My Test Note",
        content: "<p>Hello world</p>"
      });

    expect(res.status).to.equal(201);
    expect(res.body.note).to.have.property("_id");

    noteId = res.body.note._id;
  });

  it("should get all notes", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.notes).to.be.an("array");
  });

  it("should update a note", async () => {
    const res = await request(app)
      .post(`/api/notes/update/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Title" });

    expect(res.status).to.equal(200);
    expect(res.body.note.title).to.equal("Updated Title");
  });

  it("should delete a note", async () => {
    const res = await request(app)
      .post(`/api/notes/delete/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });
});
