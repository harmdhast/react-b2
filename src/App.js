import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Counter from "./Counter";
import Names from "./Names";
import Notes from "./Notes";
import './App.css';

function App({ counter }) {
  return (
    <BrowserRouter>
      <nav className="App-navigation">
        <Link to="/">Compteur</Link>
        <Link to="/names">Générateur de noms</Link>
        <Link to="/notes">Notes</Link>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Counter counter={counter} />} />
          <Route path="/names" element={<Names />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
