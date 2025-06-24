import { useState } from "react";
import { GetDevicesIp } from "../wailsjs/go/main/App";
import { Button, TextInput } from "@tremor/react";

function App() {
  const [resultText, setResultText] = useState(
    "Please enter your IP address below"
  );
  const [ip, setIp] = useState("");
  const updateIp = (e: any) => setIp(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  async function getDevicesIp() {
    const result = await GetDevicesIp(ip);
    updateResultText(result);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-xl font-bold mb-4">{resultText}</div>
      <div className="flex flex-row gap-2 mb-4">
        <TextInput onChange={updateIp} placeholder="Enter IP address" />
        <Button onClick={getDevicesIp}>Connect Device</Button>
      </div>
    </div>
  );
}

export default App;
