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
import React, { useEffect, useState, useContext } from 'react';
import { createUser, getUserByName } from "./user";
import { Loader } from "../ui/loader";
import { UserContext } from "@/App";

export function CreateUserDialog({ children, setDialogOpen, closeNav }) {
    const { profile, setProfile } = useContext(UserContext);
    const [inputName, setInputName] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        resetError();
        setInputName(e.target.value);
    };

    const handleAccept = async () => {
        // Do something with the retrieved username
        setLoading(true);
        const name = inputName.trim();

        if (name === "") {
            displayError("Votre nom d'utilisateur ne peut pas être vide.");
            setLoading(false);
            return;
        }

        if (await getUserByName(name) !== null) {
            displayError("Ce nom d'utilisateur existe déjà.");
            setLoading(false);
            return;
        };

        await createUser(name)
        resetError();
        setProfile(await getUserByName(name));
        setLoading(false);
        closeNav();
    };

    function resetError() {
        setIsError(false);
        setError("");
    }

    function displayError(text) {
        setIsError(true);
        setError(text);
    }

    return (
        <Dialog onOpenChange={(e) => { setDialogOpen(e); if (e === false) closeNav(); }}>
            <DialogTrigger asChild>
                {children}
                {/* <Button variant="outline">Share</Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="dark:text-white">Nouvel utilisateur</DialogTitle>

                </DialogHeader>
                <div className="flex flex-col">

                    <div className="flex gap-2 items-center justify-end">
                        <Label htmlFor="username" className="text-right dark:text-white w-1/6">
                            Nom
                        </Label>
                        <Input
                            id="username"
                            placeholder="John Doe"
                            className={"col-span-3 dark:text-white " + (isError ? "border dark:border-red-500 border-transparent dark:text-red-500" : "")}
                            value={inputName}
                            onChange={handleInputChange}
                            autoComplete="off"
                            disabled={loading}
                        />
                        {loading ? <Loader>
                        </Loader> : ""}
                    </div>
                    <span className="text-red-500 text-sm w-full text-right">
                        {isError ? error : ""}
                    </span>
                </div>
                <DialogFooter>
                    <Button onClick={handleAccept} disabled={loading}>Ajouter</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" disabled={loading}>
                            Annuler
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}