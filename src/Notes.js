import { useEffect, useState } from "react";

import "./App.css";

function Notes() {
    const [notes, setNotes] = useState(null);
    const [curNote, setCurrentNote] = useState(null);

    async function fetchNotes() {
        const response = await fetch("http://localhost:4000/notes");
        const data = await response.json();
        setNotes(data.reverse())
        if (!(curNote)) {
            setCurrentNote(data.at(-1))
        }
    }

    useEffect(function () {
        fetchNotes();
    }, []);

    function newNote() {
        fetch("http://localhost:4000/notes", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
         },
        body: JSON.stringify({
                "name": "New Note",
                "text": "My super new note !",
                "updated": new Date()
            })
        })
        fetchNotes();
    };

    function updateCurrentNote(e) {
        console.log(e)
    }

    // TODO
    // function deleteNote() {
    // }

    // function updateNote() {
    // }

    return (
        <>
            <aside className="Side">
                <button className="Button-create-note" onClick={newNote}>Créer une note</button>
                {notes !== null ? notes.map((note) => 
                    <button className="Note-link" onClick={updateCurrentNote}>
                        <div>{note["name"]}</div>
                        <div className="Note-link-lastUpdatedAt">{note["updated"]}</div>
                    </button>) 
                : null}
            </aside>
            <main className="Main">
                <textarea className="NoteContent" defaultValue={notes !== null ? notes.at(-1)["text"] : ""} rows="20"></textarea>
            </main>
        </>
    );
}

export default Notes;