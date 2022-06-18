// smple notes

const notes = [
  
];

class NoteApi {
    static getAllNotes(){
        const AllNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
        return AllNotes.sort((a , b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }
    static saveNote(noteToSave){
        const notes = NoteApi.getAllNotes();
        // check the notes existed or not 
        const existed = notes.find(n=> n.id == noteToSave.id);

        if(existed){
            existed.title = noteToSave.title;
            existed.body = noteToSave.body;
            existed.updated = new Date().toISOString();
        }
        else{
            noteToSave.id = new Date().getTime();
            noteToSave.updated = new Date().toDateString();

            notes.push(noteToSave);
        }

        localStorage.setItem("notes-app" , JSON.stringify(notes));


    }
    static deleteNotes(id){
        const deleteNotes = NoteApi.getAllNotes();
        const filterNote = deleteNotes.filter(n => n.id != id);

        localStorage.setItem("notes-app" , JSON.stringify(filterNote));
    }
}



