import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "../components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircledIcon, TrashIcon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input"
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
function Notes() {
    const [notes, setNotes] = useState([]);
    const [curNote, setCurrentNote] = useState(null);
    const [nameInputValue, setNameInputValue] = useState("");
    const [textInputValue, setTextInputValue] = useState("");

    let navigate = useNavigate();

    const { id } = useParams();

    async function fetchNotes() {
        const response = await fetch("http://localhost:4000/notes?_sort=updated&_order=desc");
        const data = await response.json();
        try {
            //await data.sort(((a, b) => a.updated - b.updated));
            setNotes(data);
        } catch (error) {
            return;
        }
    }

    async function changeNote() {
        if (id) {
            let note = await notes.find(n => n.id == id);
            if (note) {
                return setCurrentNote(note);
            }
            return navigate("/notes");
        } else {
            setNameInputValue("");
            setTextInputValue("");
            return setCurrentNote(null);
        }
    }

    async function saveNotes() {
        await fetch("http://localhost:4000/notes", {
            method: "POST", headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(notes)
        });
    }

    useEffect(() => {
        changeNote();
    }, [id]);


    useEffect(() => {
        fetchNotes();
    }, []);

    async function getLastNote() {
        const resp =  await fetch("http://localhost:4000/notes?_sort=updated&_order=desc&_limit=1");
        return await resp.json();
    }

    async function newNote() {
        await fetch("http://localhost:4000/notes", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": "Mon titre",
                "text": "Ma super nouvelle note !",
                "created": new Date().getTime(),
                "updated": new Date().getTime()
            })
        })

        await fetchNotes();
        let note = await getLastNote();
        navigate(`/notes/${note[0].id}`);
        changeNote();
    };

    function updateCurrentNote(e) {
        console.log(e)
    }

    async function deleteNote(id) {
        await fetch(`http://localhost:4000/notes/${id}`, {
            method: "DELETE"
        });
        setNotes(notes.filter(n => n.id !== id));
        navigate(`/notes`);
    }

    async function saveNote(id) {
        let newNote = {
            ...curNote,
            updated: new Date().getTime()
        }
        await fetch(`http://localhost:4000/notes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote)
        });
        setNotes([newNote, ...notes.filter(n => n.id !== id)]);
    }

    // Update the name and text properties of a specific note
    const updateNote = (noteId, newProperties) => {
        setNotes((prevNotes) => {
            return prevNotes.map((note) => {
                if (note.id === noteId) {
                    // Update the name and text properties for the specific note
                    setCurrentNote({
                        ...note,
                        ...newProperties,
                    });

                    // Update the input values states as well
                    setNameInputValue(newProperties.name);
                    setTextInputValue(newProperties.text);

                    return {
                        ...note,
                        ...newProperties,
                    };
                }
                return note;
            });
        });
    };

    useEffect(() => {
        // Check if curNote is not null before updating the input value
        if (curNote !== null) {
            setNameInputValue(curNote.name);
            setTextInputValue(curNote.text);
        }
    }, [curNote]);

    return (
        <div className="bg-slate-900 h-full text-white gap-1 pt-4">
            <div className="container h-full flex flex-row grow gap-4">
                <aside className="w-1/4">
                    <Button className="flex flex-row w-full rounded-none rounded-t font-bold" onClick={newNote}>
                        <PlusCircledIcon className="mr-2 w-5 h-5" />Nouvelle note
                    </Button>
                    <ScrollArea className=" h-5/6 rounded-none rounded-b border border-slate-800 border-t-0">
                        {notes !== null ? notes.map((note) =>
                            <Link to={"/notes/" + note["id"]} className={"flex flex-row h-full items-center justify-around w-full shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 border-b rounded-none " + (curNote && note["id"] === curNote["id"] ? " border-l-8 dark:border-l-gray-50 " : "")} key={note["id"]}>
                                <div className="m-1 flex flex-col text-left">
                                    <div className=" overflow-hidden max-w-32 whitespace-nowrap text-ellipsis">{note["name"]}</div>
                                    <div className="Note-link-lastUpdatedAt">{new Date(note["updated"]).toDateString()}</div>
                                </div>
                                <div className="h-full flex flex-row gap-2">

                                    <Button variant="outline" size="icon" asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger><TrashIcon className=" text-red-600 opacity-0 hover:opacity-100 transition-opacity h-7 w-7"></TrashIcon></AlertDialogTrigger>
                                            <AlertDialogContent className="dark:bg-slate-900">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-red-600">Supprimer la note ?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Voulez-vous envoyer la note à jamais avec papa Johnny ?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="dark:bg-white">Annuler</AlertDialogCancel>
                                                    <AlertDialogAction className="dark:bg-red-600 dark:text-white dark:hover:bg-red-800" onClick={() => { deleteNote(note["id"]) }}>Supprimer</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>


                                    </Button>
                                    <Button variant="outline" size="icon" asChild onClick={() => { /*deleteNote(note["id"])*/ }}>
                                        {
                                            note["is_starred"] ?
                                                <StarFilledIcon className=" text-yellow-300 opacity-50 hover:opacity-100 transition-opacity h-7 w-7 dark:bg-transparent border-0"></StarFilledIcon> :
                                                <StarIcon className=" text-yellow-300 opacity-50 hover:opacity-100 transition-opacity h-7 w-7 dark:bg-transparent border-0"></StarIcon>
                                        }

                                    </Button>

                                </div>
                            </Link>)
                            : null}
                    </ScrollArea>

                </aside>
                <main className="w-3/4">
                    <div className="flex flex-row rounded-none rounded-t bg-white h-9 border dark:border-white text-black font-bold">
                        <Input
                            type="text"
                            placeholder=""
                            className="w-1/2 border-0"
                            style={{ outline: "none !important", boxShadow: "none" }}
                            //defaultValue={curNote !== null ? curNote["name"] : ""}
                            value={nameInputValue}
                            disabled={curNote === null}
                            //onChange={(e) => updateNoteName(curNote.id, e.target.value)}
                            onChange={(e) => {
                                setNameInputValue(e.target.value);
                                updateNote(curNote.id, { name: e.target.value });
                            }}
                        />
                        <div className="flex flex-row grow items-center justify-end">
                            <Button disabled={curNote === null} variant="ghost" className="rounded-none mr-2" onClick={() => { saveNote(curNote["id"]) }}>
                                Save
                            </Button>

                        </div>
                    </div>
                    <Textarea
                        placeholder="Choisissez ou créez une note !"
                        className="resize-none rounded-none rounded-b h-5/6"
                        //defaultValue={(curNote !== null && notes.length > 0) ? curNote["text"] : ""}
                        value={textInputValue}
                        disabled={curNote === null}
                        onChange={(e) => {
                            setTextInputValue(e.target.value);
                            updateNote(curNote.id, { text: e.target.value });
                        }}
                    />
                </main>
            </div>

        </div>
    );
}

export default Notes;