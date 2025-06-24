import { useState } from "react";
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
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-xl font-bold mb-4">{resultText}</div>
      <div className="flex flex-row gap-2 mb-4">
        <TextInput onChange={updateName} placeholder="Enter your name" />
        <Button onClick={greet}>Greet</Button>
      </div>
    </div>
  );
}

export default App;
