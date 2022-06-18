import App from "./app.js";

const root = document.querySelector("#root");

const app = new App(root);


// import NoteApi from "./NoteApi.js";
// import NoteView from "./NoteView.js";


// const view = new NoteView(root , {
//     onNoteAdd: ()=>{
//         console.log('note btn was added')
//     },
//     onNoteEdit : (newTitle , newBody)=>{
//         console.log(newTitle , newBody)
//     },
//     onNoteSelect : (noteId)=>{
//         console.log(noteId)
//     },
//     onNoteDelete(noteId){
//         console.log(noteId)
//     }
// });

// view.updateNote(NoteApi.getAllNotes())
// view.updateActiveNote(NoteApi.getAllNotes()[0])