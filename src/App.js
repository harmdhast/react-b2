import { DarkModeSwitch } from "@/components/misc/darkMode";
import { Toaster } from "@/components/ui/toaster";
import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Counter from "./Counter";
import Names from "./Names";
import Notes from "./Notes";
import { NavMenu } from "./NavMenu";

import { fetchLastProfile } from "./components/profile/user";
import { Loader } from "./components/ui/loader";
import { useLocalStorage } from "./components/misc/useLocalStorage";

export const UserContext = createContext(null);

function App() {
    // Other apps
    const [count, setCount] = useState(0);
    const [name, setName] = useState(null);

    const [notes, setNotes] = useState(null);
    const [curNote, setCurrentNote] = useState(null);


    const [profile, setProfile] = useState(null);
    const [theme, setTheme] = useLocalStorage("darkmode", null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLastProfile().then((p) => { setProfile(p); setTimeout(() => { setLoading(false) }, 200) })
    }, [])

    useEffect(() => {
        if (profile !== null) localStorage.setItem("profile", profile.id);
    }, [profile])

    return (
        <UserContext.Provider value={{ theme, setTheme, profile, setProfile }}>

            <BrowserRouter>
                {loading ?
                    <div className="absolute w-full h-full top-0 left-0 bg-opacity-15 dark:bg-opacity-30 bg-black" style={{ zIndex: 9999 }}>
                        <Loader></Loader>
                    </div>
                    : ""}
                <nav className=" bg-sky-400 dark:bg-zinc-950 flex gap-4 p-4 text-white items-center shadow shadow-zinc-200 dark:shadow-none drop-shadow-sm z-50">
                    <NavMenu></NavMenu>
                    <div className="ml-auto">
                        <DarkModeSwitch></DarkModeSwitch>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Navigate to="/notes" replace />} /> {/*On redirige la racine sur notes en application par défaut*/}
                    <Route path="/count" element={<Counter count={count} setCount={setCount} />} />
                    <Route path="/names" element={<Names name={name} setName={setName} />} />
                    <Route path="/notes" element={<Notes notes={notes} setNotes={setNotes} curNote={curNote} setCurrentNote={setCurrentNote} />} />
                    <Route path="/notes/:id" element={<Notes notes={notes} setNotes={setNotes} curNote={curNote} setCurrentNote={setCurrentNote} />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </UserContext.Provider >
    );
}

export default App;
