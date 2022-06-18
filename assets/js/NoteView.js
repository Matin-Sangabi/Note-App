export default class NoteView{
    constructor(root , handlres){
        this.root = root;

        //get handlres
        const {onNoteAdd , onNoteEdit , onNoteSelect , onNoteDelete} = handlres;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteSelect = onNoteSelect;
        this.onNoteDelete = onNoteDelete;

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

        this.updateVisibilityNote(false);
    }

    _createNoteElement(id , title , body , updated){
        const MAX_TITLE_LENGTH = 15;
        const MAX_BODY_LENGTH = 40;
        return `
        <li class="note-list-item" data-note = "${id}">
            <div class="note-title">
                ${title.substring(0, MAX_TITLE_LENGTH)}
                ${title.length > MAX_TITLE_LENGTH ? "..." : ""}
                <span>
                    <i class="fa fa-trash" data-note="${id}"></i>
                </span>
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

        const noteListItem = this.root.querySelectorAll(".note-list-item");
        noteListItem.forEach(item =>{
            item.addEventListener("click" , ()=>{
                this.onNoteSelect(item.dataset.note);
            });
        });

        const trashIcon = this.root.querySelectorAll(".fa-trash");

        trashIcon.forEach(trash =>{
            trash.addEventListener("click" , (e)=>{
              //how to prevent parent event to child in javascript
              e.stopPropagation();
              this.onNoteDelete(e.target.dataset.note);
            })
        });
    }

    updateActiveNote(note){
        this.root.querySelector(".insert-note-title").value = note.title;
        this.root.querySelector(".insert-note-body").value = note.body;

        this.root.querySelectorAll(".note-list-item").forEach(item =>{
            item.classList.remove("note-list-item-selected");
        });

        this.root.querySelector(
          `.note-list-item[data-note = "${note.id}"]`
        ).classList.add("note-list-item-selected");
    }

    updateVisibilityNote(visible){
        this.root.querySelector('.main-content').style.visibility = visible ? "visible" : "hidden";
    }
}