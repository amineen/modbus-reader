import { useState } from "react";
import logo from "./assets/images/logo-universal.png";
import { Greet } from "../wailsjs/go/main/App";
import { Button, TextInput } from "@tremor/react";

function App() {
  const [resultText, setResultText] = useState(
    "Please enter your name below 👇"
  );
  const [name, setName] = useState("");
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function greet() {
    Greet(name).then(updateResultText);
  }

  return (
    <div id="App">
      <img src={logo} id="logo" alt="logo" />
      <div id="result" className="result">
        {resultText}
      </div>
      <div className="flex flex-row gap-2">
        <TextInput onChange={updateName} placeholder="Enter your name" />
        <Button onClick={greet}>Greet</Button>
      </div>
    </div>
  );
}

export default App;
