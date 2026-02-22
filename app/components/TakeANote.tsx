"use client";

import React, { useState } from "react";

import { Note } from "../types/note-types";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function TakeANote() {
  const [newNote, setNewNote] = useState<Note | null>(null);
  const [showNoteTextArea, setShowNoteTextArea] = useState(false);
  const dispatch = useDispatch();

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote({ content: (e.target as any).value, id: uuidv4() });
  };
  const handleShowHideTextArea = () => {
    setShowNoteTextArea(!showNoteTextArea);
  };
  const handleCloseTextArea = () => {
    if (newNote) {
      dispatch({ type: "ADD_NOTE", payload: newNote });
      setNewNote(null);
    }
    setShowNoteTextArea(!showNoteTextArea);
  };

  return (
    <section className="mb-12">
      {showNoteTextArea ? (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
          <textarea
            className="w-full h-32 bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
            onChange={handleNoteChange}
            value={newNote?.content || ""}
            placeholder="What's on your mind?"
          ></textarea>
          <div className="flex gap-3 mt-4">
            <button
              className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={handleCloseTextArea}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <button
          className="group bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-4 rounded-2xl font-medium transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
          onClick={handleShowHideTextArea}
        >
          <span className="text-lg">+ Take a note</span>
        </button>
      )}
    </section>
  );
}
