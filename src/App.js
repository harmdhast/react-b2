import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import Counter from "./Counter";
import Names from "./Names";
import Notes from "./Notes";

function App() {
  const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
      <nav className="bg-slate-900 flex gap-4 p-4 text-white">
        <Link to="/count">Compteur</Link>
        <Link to="/names">Générateur de noms</Link>
        <Link to="/notes">Notes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" replace />} /> {/*On redirige la racine sur notes en application par défaut*/}
        <Route path="/count" element={<Counter count={count} setCount={setCount} />} />
        <Route path="/names" element={<Names />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
