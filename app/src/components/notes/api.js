const API_HOST = process.env.REACT_APP_API_HOST;

async function getNotes() {
    const response = await fetch(`${API_HOST}/notes?_sort=starred,updated&_order=desc,desc`);
    const data = await response.json();

    if (data.length === 0) {
        return null;
    }
    return data;
}

async function getLastNote() {
    const resp = await fetch(`${API_HOST}/notes?_sort=updated&_order=desc&_limit=1`);
    return await resp.json();
}

async function createNewNote() {
    await fetch(`${API_HOST}/notes`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": "Nouvelle note",
            "text": "Ma super nouvelle note !",
            "created": new Date().getTime(),
            "updated": new Date().getTime(),
            "starred": false,
            "checked": false
        })
    })
}

async function adeleteNote(id) {
    fetch(`${API_HOST}/notes/${id}`, {
        method: "DELETE"
    });
}

async function asaveNote(id, newNote) {
    fetch(`${API_HOST}/notes/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote)
    })
}

async function astarNote(id, newNote) {
    fetch(`${API_HOST}/notes/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote)
    });
}

async function acheckNote(id, newNote) {
    fetch(`${API_HOST}/notes/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote)
    });
}

export { getNotes, getLastNote, createNewNote, adeleteNote, asaveNote, astarNote, acheckNote }