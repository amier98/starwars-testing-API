import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const APICall = async () => {
      try {
        const result = await fetch("https://swapi.dev/api/people/1");

        if (result.status === 200) {
          const res = await result.json();
          setErrorMessage("");
          setData(res.name);
        } else if (result.status === 500) {
          setErrorMessage("Oops... something went wrong, try again 🤕");
        } else if (result.status === 418) {
          setErrorMessage("I'm a tea pot 🫖, silly");
        }
      } catch (error) {
        console.log(error);
      }
    };

    APICall();
  }, []);

  return (
    <>
      <div>
        <h2>{data}</h2>
        {errorMessage && <h3>{errorMessage}</h3>}
      </div>
    </>
  );
}

export default App;
