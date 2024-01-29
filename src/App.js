import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Counter from "./Counter";
import Names from "./Names";
import Notes from "./Notes";
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
      <nav className="bg-slate-900 flex gap-4 p-4 text-white">
        <Link to="/">Compteur</Link>
        <Link to="/names">Générateur de noms</Link>
        <Link to="/notes">Notes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Counter count={count} setCount={setCount} />} />
        <Route path="/names" element={<Names />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
