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
});

view.updateNote(NoteApi.getAllNotes())