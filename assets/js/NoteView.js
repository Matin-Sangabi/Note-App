export default class NoteView{
    constructor(root , handlres){
        this.root = root;

        //get handlres
        const {onNoteAdd , onNoteEdit} = handlres;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;

        root.innerHTML = `<div class="sidebar">
            <div class="sidebar-logo">
                Note App
            </div>
            <ul class="note-items">
            </ul>
            <button class="add-note">New Note</button>
        </div>
        <div class="main-content">
            <input type="text" placeholder="note-title" class="insert-note-title">
            <textarea class="insert-note-body" placeholder="note-body ..."></textarea>
        </div> `;

        const addNoteBtn = this.root.querySelector(".add-note");
        const noteTitle = this.root.querySelector(".insert-note-title");
        const noteBody = this.root.querySelector(".insert-note-body");

        addNoteBtn.addEventListener("click" , ()=>{
            this.onNoteAdd();
        });

        [noteTitle , noteBody].forEach(insert => {
            insert.addEventListener("blur" , ()=>{
                const newTitle = noteTitle.value.trim();
                const newBody = noteBody.value.trim();

                this.onNoteEdit(newTitle , newBody);
            });
        });
    }
}