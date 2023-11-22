import { useState } from "react";

function Names() {
  const [name, setName] = useState(null);

  async function replaceName() {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const name = data.results[0].name;
    setName(name.first + " " + name.last);
  }

  return (
    <div className="App">
      <div>{name}</div>
      <button onClick={replaceName}>Changer nom</button>
    </div>
  );
}

export default Names;
