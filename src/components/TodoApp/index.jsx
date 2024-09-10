import React, { useEffect, useState } from "react";
import Notes from "./Notes";

export default function TodoApp() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    if (currentUser) {
      const storedNotes =
        JSON.parse(localStorage.getItem(`notes_${currentUser}`)) || [];
      setNotes(storedNotes);
    }
  }, [currentUser]);

  const handleAddNote = () => {
    if (currentNote.trim() !== "") {
      const date = new Date().toLocaleDateString();
      const noteObject = {
        checkbox: false,
        note: currentNote,
        date: date,
      };

      if (editingIndex !== null) {
        const updatedNotes = notes.map((note, index) =>
          index === editingIndex ? { ...note, ...noteObject } : note
        );
        localStorage.setItem(
          `notes_${currentUser}`,
          JSON.stringify(updatedNotes)
        );
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        const newNotes = [...notes, noteObject];
        localStorage.setItem(`notes_${currentUser}`, JSON.stringify(newNotes));
        setNotes(newNotes);
      }

      setCurrentNote("");
    }
  };

  const handleRemoveNote = (index) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = notes.filter((_, i) => i !== index);
      localStorage.setItem(
        `notes_${currentUser}`,
        JSON.stringify(updatedNotes)
      );
      setNotes(updatedNotes);
      if (index === editingIndex) {
        setCurrentNote("");
        setEditingIndex(null);
      }
    }
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index].note);
    setEditingIndex(index);
  };

  const handleCheckboxChange = (index) => {
    const updatedNotes = notes.map((note, i) => {
      if (i === index) {
        return {
          ...note,
          checkbox: !note.checkbox,
        };
      }
      return note;
    });
    localStorage.setItem(`notes_${currentUser}`, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  return (
    <div>
      <Notes
        notes={notes}
        handleAddNote={handleAddNote}
        handleRemoveNote={handleRemoveNote}
        handleEditNote={handleEditNote}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}
