import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "./components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader } from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast"
import { PlusCircledIcon, TrashIcon, StarFilledIcon, StarIcon, ReaderIcon } from "@radix-ui/react-icons";
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
import { MarkdownViewer } from "@/components/notes/MarkdownViewer";
import { useDebouncedEffect } from "./components/notes/useDebouncedEffect";
function Notes({ notes, setNotes, curNote, setCurrentNote }) {
    const [nameInputValue, setNameInputValue] = useState("");
    const [textInputValue, setTextInputValue] = useState("");
    const [isMarkdown, setMarkdown] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [needSave, setNeedSave] = useState(0);
    const [prevNote, setPrevNote] = useState(null);
    const { toast } = useToast();

    let navigate = useNavigate();

    const { id } = useParams();

    async function fetchNotes() {
        const response = await fetch("http://localhost:4000/notes?_sort=starred,updated&_order=desc,desc");
        const data = await response.json();
        try {
            //await data.sort(((a, b) => a.updated - b.updated));
            setNotes(data);
        } catch (error) {
            return;
        }
    }

    async function changeNote() {
        if (id && notes) {
            let note = await notes.find(n => n.id === id);
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

    useEffect(() => {
        changeNote();
    }, [id, notes]);


    useEffect(() => {
        fetchNotes().then(() => {
            setLoading(false)
        });
    }, []);

    async function getLastNote() {
        const resp = await fetch("http://localhost:4000/notes?_sort=updated&_order=desc&_limit=1");
        return await resp.json();
    }

    // TODO: Créer la note en local et l'upload en save
    async function newNote() {
        await fetch("http://localhost:4000/notes", {
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

        await fetchNotes();
        let note = await getLastNote();
        navigate(`/notes/${note[0].id}`);
        changeNote();
        // TODO: Focus et selectionner le titre de la nouvelle note
    };

    async function deleteNote(id) {
        await fetch(`http://localhost:4000/notes/${id}`, {
            method: "DELETE"
        });
        setNotesWrapper(notes.filter(n => n.id !== id));
        navigate(`/notes`);
    }

    async function saveNote(id) {
        let newNote = {
            ...curNote,
            updated: new Date().getTime()
        }
        fetch(`http://localhost:4000/notes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote)
        }).then(() => {
            toast({
                title: "Note enregistrée.",
                description: `${newNote["name"]} sauvegardée avec succès.`,
                variant: "success"
            })
        });
        //setNotesWrapper([newNote, ...notes.filter(n => n.id !== id)]);
        //fetchNotes();
    }

    async function setNotesWrapper(newNotes) {
        newNotes.sort((a, b) =>
            b.updated - a.updated + (b.starred ? 10000000 : 0) + (a.starred ? -10000000 : 0)
        )
        setNotes(newNotes)
    }

    async function starNote(id) {
        let note = notes.find(n => n.id === id)
        let newNote = {
            ...note,
            starred: !note["starred"],
            updated: new Date().getTime()
        }
        fetch(`http://localhost:4000/notes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote)
        });
        setCurrentNote(newNote);
        setNotesWrapper([newNote, ...notes.filter(n => n.id !== id)]);
    }

    async function checkNote(id) {
        let note = notes.find(n => n.id === id)
        let newNote = {
            ...note,
            checked: !note["checked"]
        }
        fetch(`http://localhost:4000/notes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote)
        });
        setCurrentNote(newNote);
        setNotesWrapper([newNote, ...notes.filter(n => n.id !== id)]);
    }

    useDebouncedEffect(() => {
        if (curNote) { saveNote(curNote.id) }

    }, [needSave], 1000)

    // Update the name and text properties of a specific note
    const updateNote = (noteId, newProperties) => {
        setNotes((prevNotes) => {
            return prevNotes.map((note) => {
                if (note.id === noteId) {
                    // Update the name and text properties for the specific note
                    setCurrentNote({
                        ...note,
                        ...newProperties,
                        changed: true
                    });

                    // Update the input values states as well
                    setNameInputValue(newProperties.name);
                    setTextInputValue(newProperties.text);

                    setNeedSave(needSave + 1);

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
        if (prevNote && curNote !== null && prevNote.id !== curNote.id && prevNote["changed"] === true) {
            saveNote(prevNote.id);
            setPrevNote({ ...prevNote, changed: false })
        }
        // Check if curNote is not null before updating the input value
        if (curNote !== null) {
            setNameInputValue(curNote.name);
            setTextInputValue(curNote.text);
            setPrevNote(curNote);
        }
    }, [curNote]);

    return (
        <div className="bg-slate-900 h-full text-white gap-1 pt-4">

            <div className="container h-full flex flex-row grow gap-4">
                <aside className="w-2/6">
                    <Button className="flex flex-row w-full rounded-none rounded-t font-bold" onClick={newNote}>
                        <PlusCircledIcon className="mr-2 w-5 h-5" />Nouvelle note
                    </Button>
                    {isLoading ? <Loader className="h-5/6"></Loader> :
                        <ScrollArea className=" h-5/6 rounded-none rounded-b border border-slate-800 border-t-0">
                            {
                                notes.map((note) =>
                                    <Link to={"/notes/" + note["id"]} className={"group flex flex-row h-full items-center justify-around w-full shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 border-b rounded-none " + ((curNote && note["id"] === curNote["id"]) ? (" border-l-8 " + (curNote["checked"] ? " dark:border-l-green-300  " : " dark:border-l-gray-50")) : "")} key={note["id"]}>
                                        <div className="m-1 flex flex-col text-left">
                                            <div className={" overflow-hidden max-w-32 whitespace-nowrap text-ellipsis font-bold " + (note["checked"] ? " text-green-300" : "")}>{note["name"]}</div>
                                            <div className="Note-link-lastUpdatedAt">{new Date(note["updated"]).toDateString()}</div>
                                        </div>
                                        <div className="h-full flex flex-row gap-2 justify-center items-center">

                                            <Button variant="outline" size="icon" asChild>
                                                <AlertDialog>
                                                    <AlertDialogTrigger><TrashIcon className=" text-red-600 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"></TrashIcon></AlertDialogTrigger>
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
                                            <Checkbox
                                                id="checked"
                                                onClick={() => { checkNote(note["id"]) }}
                                                checked={note["checked"]}
                                                className="dark:data-[state=checked]:bg-green-300 dark:data-[state=checked]:border-green-300 w-7 h-7 text-3xl"
                                            />
                                            <Button variant="outline" size="icon" asChild onClick={() => { starNote(note["id"]) }}>
                                                {
                                                    note["starred"] ?
                                                        <StarFilledIcon className=" text-yellow-300 opacity-50 hover:opacity-100 transition-opacity h-7 w-7 dark:bg-transparent border-0"></StarFilledIcon> :
                                                        <StarIcon className=" text-yellow-300 opacity-50 hover:opacity-100 transition-opacity h-7 w-7 dark:bg-transparent border-0"></StarIcon>
                                                }

                                            </Button>

                                        </div>
                                    </Link>)
                            }
                        </ScrollArea>}

                </aside>
                <main className="w-4/6">
                    <div className={"flex flex-row rounded-none rounded-t h-9 border text-black font-bold " + ((curNote && curNote["checked"]) ? "bg-green-300 dark:border-green-300" : "bg-white dark:border-white")}>
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
                                //setNameInputValue(e.target.value);
                                updateNote(curNote.id, { name: e.target.value });
                            }}
                        />
                        <div className="flex flex-row grow items-center justify-end">
                            <div className="flex items-center space-x-2">
                                <Switch id="airplane-mode" checked={isMarkdown} onClick={() => setMarkdown(!isMarkdown)} />
                                <Label htmlFor="airplane-mode"><ReaderIcon className="w-7 h-7"></ReaderIcon></Label>
                            </div>
                            <Button disabled={curNote === null} variant="ghost" className="rounded-none mr-2" onClick={() => { saveNote(curNote["id"]) }}>
                                Save
                            </Button>


                        </div>
                    </div>
                    {isMarkdown ?
                        <div className="p-4 border-slate-800 border rounded-none rounded-b h-5/6">
                            <MarkdownViewer content={textInputValue}></MarkdownViewer>
                        </div>
                        :
                        <Textarea
                            placeholder="Choisissez ou créez une note !"
                            className={"resize-none rounded-none rounded-b h-5/6" + (curNote === null ? " text-3xl text-center p-4" : "")}
                            value={textInputValue}
                            disabled={curNote === null}
                            onChange={(e) => {
                                //setTextInputValue(e.target.value);
                                updateNote(curNote.id, { text: e.target.value });
                            }}
                        />
                    }

                </main>
            </div>

        </div>
    );
}

export default Notes;