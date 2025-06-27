import { useState } from "react";
import { GetDevicesIp } from "../wailsjs/go/main/App";
import { Button, TextInput } from "@tremor/react";

function App() {
  const [resultText, setResultText] = useState(
    "Enter the IP address and port below"
  );
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("502");
  const updateIp = (e: any) => setIp(e.target.value);
  const updatePort = (e: any) => setPort(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  async function getDevicesIp() {
    const result = await GetDevicesIp(ip, port);
    updateResultText(result.Ip + ":" + result.Port);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-xl font-bold mb-4">{resultText}</div>
      <div className="flex flex-row gap-2 mb-4">
        <TextInput
          className="flex-1 w-full"
          onChange={updateIp}
          placeholder="Enter IP address"
        />
        <TextInput
          className="flex-0 w-12"
          onChange={updatePort}
          placeholder="Enter Port"
          value={port}
        />
        <Button
          className="flex-0"
          onClick={getDevicesIp}
          disabled={ip === "" || port === ""}
        >
          Connect Device
        </Button>
      </div>
    </div>
  );
}

export default App;
