import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from 'react';
export function CreateUserDialog({ children }) {

    const [username, setUsername] = useState('');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleAccept = () => {
        // Do something with the retrieved username
        console.log('Username:', username);
        setIsError(!isError);
        console.log(isError)
    };

    function noEvent(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Dialog >
            <DialogTrigger asChild>
                {children}
                {/* <Button variant="outline">Share</Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="dark:text-white">Nouvel utilisateur</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right dark:text-white">
                            Nom
                        </Label>
                        <Input
                            id="username"
                            placeholder="John Doe"
                            className={"col-span-3 dark:text-white " + (isError ? "border dark:border-red-500 border-transparent dark:text-red-500" : "")}
                            value={username}
                            onChange={handleInputChange}
                            autocomplete="off"
                        />
                        {isError ?
                            <div className="text-red">
                                {error}

                            </div>
                            : ""}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAccept}>Ajouter</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Fermer
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}