import { useState } from "react";
import { GetDevicesIp, ReadHoldingRegisters } from "../wailsjs/go/main/App";
import { Button, TextInput, Table, Card } from "@tremor/react";

function App() {
  const [resultText, setResultText] = useState(
    "Enter the IP address and port below"
  );
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("502");
  const [isConnected, setIsConnected] = useState(false);
  const [startRegister, setStartRegister] = useState("");
  const [quantity, setQuantity] = useState("");
  const [readings, setReadings] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateIp = (e: any) => setIp(e.target.value);
  const updatePort = (e: any) => setPort(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  async function getDevicesIp() {
    const result = await GetDevicesIp(ip, port);
    updateResultText(result.Ip + ":" + result.Port);
    setIsConnected(true);
  }

  async function handleReadRegisters() {
    setLoading(true);
    setError("");
    setReadings(null);
    try {
      const start = parseInt(startRegister, 10);
      const qty = parseInt(quantity, 10);
      if (isNaN(start) || isNaN(qty) || qty <= 0) {
        setError("Please enter valid numbers for register and quantity.");
        setLoading(false);
        return;
      }
      const result = await ReadHoldingRegisters(start, qty);
      setReadings(result);
    } catch (err: any) {
      setError("Failed to read registers: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-xl font-bold mb-4">{resultText}</div>
      {!isConnected ? (
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
      ) : (
        <Card className="w-full max-w-md p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <TextInput
                className="flex-1"
                placeholder="Starting Register"
                value={startRegister}
                onChange={(e) => setStartRegister(e.target.value)}
                type="number"
                min={0}
              />
              <TextInput
                className="flex-1"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                min={1}
              />
              <Button
                className="flex-0"
                onClick={handleReadRegisters}
                loading={loading}
                disabled={loading || startRegister === "" || quantity === ""}
              >
                Read
              </Button>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {readings && (
              <Table className="mt-4">
                <thead>
                  <tr>
                    <th>Register</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((val, idx) => (
                    <tr key={idx}>
                      <td>{parseInt(startRegister, 10) + idx}</td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

export default App;
