import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import Counter from "./Counter";
import Names from "./Names";
import Notes from "./notes/Notes";

function App() {
    //const [notes, setNotes] = useState(null);
    //const [curNote, setCurrentNote] = useState(null);
    const [count, setCount] = useState(0);
    const [name, setName] = useState(null);

    return (
        <BrowserRouter>
            <nav className=" bg-slate-950 flex gap-4 p-4 text-white">
                <Link to="/count">Compteur</Link>
                <Link to="/names">Générateur de noms</Link>
                <Link to="/notes">Notes</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Navigate to="/notes" replace />} /> {/*On redirige la racine sur notes en application par défaut*/}
                <Route path="/count" element={<Counter count={count} setCount={setCount} />} />
                <Route path="/names" element={<Names name={name} setName={setName} />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/notes/:id" element={<Notes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
