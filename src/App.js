import { DarkModeSwitch } from "@/components/misc/darkMode";
import { Toaster } from "@/components/ui/toaster";
import { useState, createContext } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Counter from "./Counter";
import Names from "./Names";
import Notes from "./Notes";
import { UserProfile } from "./UserProfile";

export const UserContext = createContext(null);

function App() {
    const [notes, setNotes] = useState(null);
    const [curNote, setCurrentNote] = useState(null);
    const [count, setCount] = useState(0);
    const [name, setName] = useState(null);
    const [user, setUser] = useState(null);
    const [isDarkMode, toggleDarkMode] = useState(null);

    return (
        <UserContext.Provider value={{ isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode }}>
            <BrowserRouter>
                <nav className=" bg-sky-400 dark:bg-zinc-950 flex gap-4 p-4 text-white items-center shadow shadow-zinc-200 dark:shadow-none drop-shadow-sm">
                    <Link to="/count">Compteur</Link>
                    <Link to="/names">Générateur de noms</Link>
                    <Link to="/notes">Notes</Link>
                    <div className="ml-auto">
                        <UserProfile user={user} setUser={setUser}></UserProfile>
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
        </UserContext.Provider>
    );
}

export default App;
