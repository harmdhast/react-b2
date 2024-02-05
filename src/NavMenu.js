import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PlusIcon, PersonIcon, TrashIcon } from '@radix-ui/react-icons'

import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./components/ui/button"
import { UserContext } from "./App"
import { CreateUserDialog } from "./components/profile/create_user"

const components = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export function NavMenu() {
    const { profile } = useContext(UserContext);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        console.log(profile)
        if (profile) setUsername(profile.username)
    }, [profile])

    return (
        <div>
            {true ?
                < NavigationMenu >
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-lg bg-sky-400 hover:bg-sky-600">
                                <Avatar className="w-7 h-7 mr-2">
                                    <AvatarImage src="https://github.com/ghost.png" />
                                </Avatar>
                                {username}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="">
                                <div className="flex gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-32 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md dark:hover:bg-zinc-800 hover:bg-zinc-200"
                                            href="/"
                                        >
                                            <img className="rounded-full" src="https://github.com/ghost.png"></img>
                                            <div className="mb-2 mt-4 text-lg font-medium text-center">
                                                {username}
                                            </div>
                                        </a>
                                    </NavigationMenuLink>
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        <CreateUserDialog>
                                            <Button variant="ghost" className="group text-xl flex w-full justify-start hover:border hover:border-green-500">
                                                <PlusIcon className="w-7 h-7 mr-2 group-hover:text-green-500"></PlusIcon> Nouvel utilisateur
                                            </Button>

                                        </CreateUserDialog>


                                        <Button variant="ghost" className="group text-xl flex w-full justify-start hover:border hover:border-red-500">
                                            <TrashIcon className="w-7 h-7 mr-2 group-hover:text-red-500"></TrashIcon> Supprimer l'utilisateur
                                        </Button>
                                        <Button variant="ghost" className="group text-xl flex w-full justify-start hover:border hover:border-cyan-500">
                                            <PersonIcon className="w-7 h-7 mr-2 group-hover:text-cyan-500"></PersonIcon> Changer d'utilisateur
                                        </Button>
                                    </div>

                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/count">
                                <NavigationMenuLink className={"group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-colors text-lg bg-sky-400 hover:bg-sky-600 dark:bg-zinc-950 hover:dark:bg-zinc-800"} >
                                    Compteur
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/names">
                                <NavigationMenuLink className={"group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-colors text-lg bg-sky-400 hover:bg-sky-600 dark:bg-zinc-950 hover:dark:bg-zinc-800"}>
                                    Générateur de noms
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/notes">
                                <NavigationMenuLink className={"group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-colors text-lg bg-sky-400 hover:bg-sky-600 dark:bg-zinc-950 hover:dark:bg-zinc-800"}>
                                    Notes
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu >
                :
                ""
            }
        </div >
    )
}