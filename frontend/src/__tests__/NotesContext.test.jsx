import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NotesProvider, useNotes } from "../context/NotesContext";
import { vi } from "vitest";
import API from "../services/api";
import React from "react";

vi.mock("../services/api");

const TestComponent = () => {
  const { notes, fetchNotes } = useNotes();

  return (
    <div>
      <button onClick={fetchNotes}>Fetch</button>
      {notes.map((note) => (
        <p key={note._id}>{note.title}</p>
      ))}
    </div>
  );
};

describe("NotesContext", () => {
  it("fetchNotes loads notes", async () => {
    API.get.mockResolvedValue({
      data: {
        success: true,
        notes: [
          {
            _id: "1",
            title: "Test Note",
            updatedAt: new Date().toISOString()
          }
        ]
      }
    });

    render(
      <NotesProvider>
        <TestComponent />
      </NotesProvider>
    );

    fireEvent.click(screen.getByText("Fetch"));

    await waitFor(() => {
      expect(screen.getByText("Test Note")).toBeInTheDocument();
    });
  });
});
