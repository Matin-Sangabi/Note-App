import NoteApi from './NoteApi.js';
import NoteView from './NoteView.js';

export default class App{
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NoteView(root , this._handlres());
        this._refreshNotes();
    }
    _refreshNotes(){
        const notes = NoteApi.getAllNotes();
        //get notes
        this.notes = notes;
        this.view.updateNote(notes);
        this.view.updateVisibilityNote(notes.length > 0);

        //active notes
        this.activeNote = notes[0];
        this.view.updateActiveNote(this.activeNote);
    }
    _handlres(){
        return {
          onNoteAdd: () => {
            const newNote = {
              title: "new Note",
              body: "new body ...",
            };
            NoteApi.saveNote(newNote);
            this._refreshNotes();
          },
          onNoteEdit: (newTitle, newBody) => {
            NoteApi.saveNote({
              id: this.activeNote.id,
              title: newTitle,
              body: newBody,
            });
            this._refreshNotes();
          },
          onNoteSelect: (noteId) => {
            const selectNote = this.notes.find((n) => n.id == noteId);
            this.activeNote = selectNote;
            this.view.updateActiveNote(selectNote);
          },
          onNoteDelete: (noteId) => {
            NoteApi.deleteNotes(noteId);
            this._refreshNotes();
          },
        };
    }
}