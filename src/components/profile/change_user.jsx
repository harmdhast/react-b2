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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState, useContext } from 'react';
import { createUser, deleteUser, getDefaultUser, getUser, getUsers } from "./user";
import { Loader } from "../ui/loader";
import { UserContext } from "@/App";

export function ChangeUserDialog({ children, setDialogOpen, closeNav }) {
    const { profile, setProfile } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        getUsers().then((u) => {
            u = [...u, getDefaultUser()];
            u = u.filter((user) => user.username !== profile.username);
            setUsers(u);
        });
        setLoading(false);
    }, [])

    const handleAccept = async (e) => {
        // Do something with the retrieved username
        console.log(e)
        setLoading(true);
        const user = await getUser(e);
        setProfile(user || getDefaultUser());
        setLoading(false);
        closeNav();
    };

    return (
        <Dialog onOpenChange={(e) => { setDialogOpen(e); if (e === false) closeNav(); }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="dark:text-white">Choisir un utilisateur</DialogTitle>

                </DialogHeader>

                <div className="flex flex-col">

                    <div className="flex gap-2 items-center justify-end">
                        {loading ? <Loader>
                        </Loader> : ""}
                        <ScrollArea className="w-96 whitespace-nowrap rounded-md">
                            <div className="flex w-max space-x-4 p-4">
                                {users.map((user) => (
                                    <a
                                        className="flex h-full w-32 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md dark:hover:bg-zinc-800 hover:bg-zinc-200 cursor-pointer"
                                        onClick={(e) => handleAccept(user.id)}
                                    >
                                        <img className="rounded-full" src={user.avatar}></img>
                                        <div className="mb-2 mt-4 text-base text-center font-light text-ellipsis overflow-hidden dark:text-zinc-200">
                                            {user.username}
                                        </div>
                                    </a>

                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>

                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" disabled={loading}>
                            Retour
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}