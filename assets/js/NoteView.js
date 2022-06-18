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

    _createNoteElement(id , title , body , updated){
        const MAX_TITLE_LENGTH = 15;
        const MAX_BODY_LENGTH = 40;
        return `
        <li class="note-list-item note" data-note = "${id}">
            <div class="note-title">
                ${title.substring(0, MAX_TITLE_LENGTH)}
                ${title.length > MAX_TITLE_LENGTH ? "..." : ""}
            </div>
            <div class="note-body">
                ${body.substring(0, MAX_BODY_LENGTH)}
                ${body.length > MAX_BODY_LENGTH ? "..." : ""}
            </div>
            <div class="note-updated">
                ${new Date(updated).toLocaleString("en" , {dateStyle : "full" , timeStyle:"short"})}
            </div>
            </li>
        `;
    }

    updateNote(notes){
        const noteItems = this.root.querySelector(".note-items");

        noteItems.innerHTML = "";

        for(const note of notes){
            const {id , title , body , updated} = note;
            const html = this._createNoteElement(id , title , body , updated);

            noteItems.innerHTML += html;
        }
    }
}