"use client";

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Note } from "../types/note-types";
import { RootState } from "../store/store";

interface NoteListProps {
  searchQuery: string;
}

export default function NoteList({ searchQuery }: NoteListProps) {
  const notesList = useSelector((state: RootState) => state.notes.notesList);
  const dispatch = useDispatch();

  const filteredNotesList = useMemo(
    () =>
      notesList.filter((item) =>
        item.content.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, notesList],
  );

  const handleDeleteNote = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.stopPropagation(); // Prevent event bubbling
    const itemToDelete = filteredNotesList[index];
    dispatch({ type: "DELETE_NOTE", payload: itemToDelete.id });
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-6 text-white/80">Your Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNotesList.map((item, index) => (
          <div
            className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl"
            key={`${item.id}`}
          >
            <div className="text-white/90 leading-relaxed wrap-break-word pr-12">
              {item.content}
            </div>
            <button
              className="absolute top-3 right-3 w-6 h-6 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-110"
              onClick={(e) => handleDeleteNote(e, index)}
              aria-label="Delete note"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
