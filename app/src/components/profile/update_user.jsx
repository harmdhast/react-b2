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
import { useContext, useEffect, useState } from 'react'
import { Loader } from "../ui/loader"
import { getDefaultUser, getUserByName, getUsers, updateUser } from "./user"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"

export function UpdateUserDialog({ children, setDialogOpen, closeNav }) {
    const { profile, setProfile } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [nameError, setNameError] = useState("");
    const [avatarError, setAvatarError] = useState("");

    useEffect(() => {
        setLoading(true);
        getUsers().then((u) => {
            u = [...u, getDefaultUser()];
            u = u.filter((user) => user.username !== profile.username);
            setUsers(u);
            setLoading(false);
        });

    }, [])

    async function handleAccept(e) {
        setLoading(true);
        const inputUsername = document.getElementById("input-username").value.trim();
        const inputAvatar = document.getElementById("input-avatar").value.trim();

        (inputUsername === "") ? setNameError("Le nom d'utilisateur ne peut pas être vide") : setNameError("");
        (inputAvatar === "") ? setAvatarError("L'avatar ne peut pas être vide") : setAvatarError("");

        if (nameError !== "" || avatarError !== "") return setLoading(false);

        // TODO: Sanitize input

        const u = await getUserByName(inputUsername);
        if (u !== null && u.username !== profile.username) {
            setNameError("Ce nom d'utilisateur existe déjà");
            setLoading(false);
            return;
        }

        // TODO: Check if link is an image

        const newProfile = {
            "username": inputUsername,
            "avatar": inputAvatar,
            "id": profile.id
        }
        updateUser(profile.id, newProfile)
        setProfile(newProfile)
        closeNav()
        setTimeout(() => setLoading(false), 300) // Make sure the nav is closed before removing the loader
    }

    function isDisabled() {
        return loading || profile.username === getDefaultUser().username;
    }

    return (
        <Dialog onOpenChange={(e) => { setDialogOpen(e); if (e === false) closeNav(); }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="dark:text-white">Mettre à jour l'utilisateur</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    {loading ?
                        <div className="absolute w-full h-full top-0 left-0 bg-opacity-15 dark:bg-opacity-30 bg-black z-50">
                            <Loader></Loader>
                        </div>
                        : ""}
                    <div className="flex gap-2 items-center justify-end">
                        <Label htmlFor="username" className="text-right dark:text-white w-1/6">
                            Nom
                        </Label>
                        <Input
                            id="input-username"
                            className={"col-span-3 dark:text-white " + (nameError !== "" ? "border dark:border-red-500 border-transparent dark:text-red-500" : "")}
                            defaultValue={profile.username}
                            autoComplete="off"
                            disabled={isDisabled()}
                        />

                    </div>
                    <span className="text-red-500 text-sm w-full text-right">
                        {nameError}
                    </span>
                    <div className="flex gap-2 items-center justify-end">
                        <Label htmlFor="username" className="text-right dark:text-white w-1/6">
                            Avatar
                        </Label>
                        <Input
                            id="input-avatar"
                            className={"col-span-3 dark:text-white " + (avatarError !== "" ? "border dark:border-red-500 border-transparent dark:text-red-500" : "")}
                            defaultValue={profile.avatar}
                            autoComplete="off"
                            disabled={isDisabled()}
                        />
                    </div>
                    <span className="text-red-500 text-sm w-full text-right">
                        {avatarError}
                    </span>
                </div>
                <DialogFooter>
                    <Button onClick={handleAccept} disabled={isDisabled()}>Valider</Button>
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