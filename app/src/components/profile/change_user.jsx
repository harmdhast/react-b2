import { UserContext } from "@/App"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useContext, useEffect, useState } from 'react'
import { Loader } from "../ui/loader"
import { DEFAULT_AVATAR, getDefaultUser, getUser, getUsers } from "./user"

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
        setLoading(true);
        const user = await getUser(e);
        setProfile(user || getDefaultUser());
        closeNav();
        setTimeout(() => setLoading(false), 300); // Make sure the nav is closed before removing the loader
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
                    {loading ?
                        <div className="absolute w-full h-full top-0 left-0 bg-opacity-15 dark:bg-opacity-30 bg-black z-50">
                            <Loader></Loader>
                        </div>
                        : ""}
                    <div className="flex gap-2 items-center justify-end">

                        <ScrollArea className="w-96 whitespace-nowrap rounded-md">
                            <div className="flex w-max space-x-4 p-4">
                                {users.length === 0 ? <span><a
                                    className="flex h-full w-32 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md dark:hover:bg-zinc-800 hover:bg-zinc-200 cursor-pointer opacity-0"
                                >
                                    <img className="rounded-full" src={DEFAULT_AVATAR}></img>
                                    <div className="mb-2 mt-4 text-base text-center font-light text-ellipsis overflow-hidden dark:text-zinc-200">
                                    </div>
                                </a><div className="absolute w-full h-full top-0 left-0 z-50">
                                        <Loader></Loader>
                                    </div>
                                </span>
                                    :
                                    users.map((user) => (
                                        <a
                                            className="flex h-full w-32 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md dark:hover:bg-zinc-800 hover:bg-zinc-200 cursor-pointer"
                                            onClick={(e) => handleAccept(user.id)}
                                        >
                                            <img className="rounded-full w-20 h-20 object-cover" src={user.avatar}></img>
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