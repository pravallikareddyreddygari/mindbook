import { Note } from "../../types/note-types";

interface NotesState {
  notesList: Note[];
}

type NotesAction =
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "DELETE_NOTE"; payload: string }
  | { type: "SET_NOTES"; payload: Note[] };

const initialState: NotesState = {
  notesList: [
    { id: "1", content: "Learn Advanced React.js" },
    { id: "2", content: "Learn Mathematics" },
    { id: "3", content: "Design DB Schema" },
  ],
};

export default function notesReducer(
  state: NotesState = initialState,
  action: NotesAction,
): NotesState {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notesList: [...state.notesList, action.payload] };
    case "DELETE_NOTE":
      return {
        ...state,
        notesList: state.notesList.filter((note) => note.id !== action.payload),
      };
    case "SET_NOTES":
      return { ...state, notesList: action.payload };
    default:
      return state;
  }
}
