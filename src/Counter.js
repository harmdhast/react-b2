import { useState } from "react";

function Counter({count, setCount}) {
  const [isError, setIsError] = useState(false);

  return (
    <div className="App">
      Compteur : {count}
      <div>
        <button
          onClick={function () {
            if (count > 0) {
              setCount(count - 1);
            } else {
              setIsError(true);
            }
          }}
        >
          -
        </button>
        <button
          onClick={function () {
            setCount(count + 1);
            setIsError(false);
          }}
        >
          +
        </button>
        {isError === true ? (
          <div className="App-error">La valeur doit être positive</div>
        ) : null}
      </div>
    </div>
  );
}

export default Counter;
