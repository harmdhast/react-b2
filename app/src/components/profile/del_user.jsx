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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState, useContext } from 'react';
import { deleteUser, getDefaultUser, getUserByName, getUsers } from "./user";
import { Loader } from "../ui/loader";
import { UserContext } from "@/App";

export function DelUserDialog({ children, setDialogOpen, closeNav }) {
    const { profile, setProfile } = useContext(UserContext);
    const [inputName, setInputName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        getUsers().then((u) => {
            setUsers(u || []);
            setLoading(false);
        });
    }, [inputName])

    const handleValueChange = (e) => {
        setInputName(e);
    };

    const handleAccept = async () => {
        // Do something with the retrieved username
        setLoading(true);
        const name = inputName.trim();

        if (name === "") {
            setError("Vous devez choisir un utilisateur.");
            setLoading(false);
            return;
        }

        const user = await getUserByName(name);

        if (user === null) {
            setError("Cet utilisateur n'existe pas.");
            setInputName("");
            setLoading(false);
            return;
        };

        await deleteUser(user.id)
        setError("");
        if (user.id === profile.id) setProfile(getDefaultUser());
        setLoading(false);
        closeNav();
    };

    return (
        <Dialog onOpenChange={(e) => { setDialogOpen(e); if (e === false) closeNav(); }}>
            <DialogTrigger asChild>
                {children}
                {/* <Button variant="outline">Share</Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="dark:text-white">Supprimer un utilisateur</DialogTitle>

                </DialogHeader>
                <div className="flex flex-col">

                    <div className="flex gap-2 items-center justify-end">
                        <Label htmlFor="username" className="text-right dark:text-white w-1/6">
                            Nom
                        </Label>
                        <Select className="col-span-3 dark:text-white" onValueChange={handleValueChange}>
                            <SelectTrigger className="col-span-3 dark:text-white">
                                <SelectValue className="col-span-3 dark:text-white" />
                            </SelectTrigger>
                            <SelectContent >
                                {users.map((x) =>
                                    <SelectItem value={x.username}>{x.username}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        {loading ? <Loader>
                        </Loader> : ""}
                    </div>
                    <span className="text-red-500 text-sm w-full text-right">
                        {error}
                    </span>
                </div>
                <DialogFooter>
                    <Button onClick={handleAccept} disabled={loading} variant="destructive">Supprimer</Button>
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