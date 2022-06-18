import NoteApi from "./NoteApi.js";
import NoteView from "./NoteView.js";

const root = document.querySelector("#root");

const view = new NoteView(root , {
    onNoteAdd: ()=>{
        console.log('note btn was added')
    },
    onNoteEdit : (newTitle , newBody)=>{
        console.log(newTitle , newBody)
    },
    onNoteSelect : (noteId)=>{
        console.log(noteId)
    },
    onNoteDelete(noteId){
        console.log(noteId)
    }
});

view.updateNote(NoteApi.getAllNotes())