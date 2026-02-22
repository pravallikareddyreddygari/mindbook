"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { Note } from "./types/note-types";
import NoteList from "./components/NoteList";
import { RootState } from "./store/store";
import TakeANote from "./components/TakeANote";

export default function Home() {
  const notesList = useSelector((state: RootState) => state.notes.notesList);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const notesListStr = localStorage.getItem("notesList");
        if (notesListStr) {
          dispatch({
            type: "SET_NOTES",
            payload: JSON.parse(notesListStr) as Note[],
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("notesList", JSON.stringify(notesList));
    }
  }, [notesList]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans">
      {/* */}

      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="max-w-4xl mx-auto px-8 py-12">
        <TakeANote />
        <NoteList searchQuery={searchQuery} />
      </main>

      <Footer />
    </div>
  );
}
