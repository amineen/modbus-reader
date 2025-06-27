import { useState } from "react";
import {
  GetDevicesIp,
  ReadHoldingRegisters,
  ComputeFloat32,
} from "../wailsjs/go/main/App";
import { main, pkg } from "../wailsjs/go/models";
import {
  Card,
  Button,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@tremor/react";
import IpForm from "./IpForm";
import AddressForm from "./AddressForm";
import ReadingTable from "./ReadingTable";
import FloatReadingTable from "./FloatReadingTable";

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
  const [page, setPage] = useState(1);
  const [floatReadings, setFloatReadings] = useState<
    pkg.ModbusReading[] | null
  >(null);
  const [floatError, setFloatError] = useState("");
  const [floatPage, setFloatPage] = useState(1);

  const updateIp = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIp(e.target.value);
  const updatePort = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPort(e.target.value);
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
    setPage(1);
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

  async function handleConvertToFloat() {
    setFloatError("");
    setFloatReadings(null);
    setFloatPage(1);
    if (!readings || readings.length < 2) {
      setFloatError("Not enough register values to convert.");
      return;
    }
    // Build RegisterValue[]
    const start = parseInt(startRegister, 10);
    const registerValues: main.RegisterValue[] = readings.map((val, idx) => ({
      Register: start + idx,
      Value: val,
    }));
    try {
      const result = await ComputeFloat32(registerValues);
      setFloatReadings(result);
    } catch (err: any) {
      setFloatError("Failed to convert to float: " + (err?.message || err));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-xl font-bold mb-4">{resultText}</div>
      {!isConnected ? (
        <IpForm
          ip={ip}
          port={port}
          onIpChange={updateIp}
          onPortChange={updatePort}
          onConnect={getDevicesIp}
          disabled={ip === "" || port === ""}
        />
      ) : (
        <Card className="w-full max-w-md p-4">
          <div className="flex flex-col gap-4">
            <AddressForm
              startRegister={startRegister}
              quantity={quantity}
              onStartChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStartRegister(e.target.value)
              }
              onQuantityChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(e.target.value)
              }
              onRead={handleReadRegisters}
              loading={loading}
              disabled={loading || startRegister === "" || quantity === ""}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {readings && (
              <>
                <Button
                  className="mt-4 w-full"
                  onClick={handleConvertToFloat}
                  disabled={readings.length < 2}
                >
                  Convert to Float32
                </Button>
                {floatError && (
                  <div className="text-red-500 text-sm mt-2">{floatError}</div>
                )}
                <TabGroup>
                  <TabList className="mt-4">
                    <Tab>Register Values</Tab>
                    <Tab>Float Values</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <ReadingTable
                        readings={readings}
                        startRegister={startRegister}
                        page={page}
                        setPage={setPage}
                      />
                    </TabPanel>
                    <TabPanel>
                      {floatReadings ? (
                        <FloatReadingTable
                          readings={floatReadings}
                          page={floatPage}
                          setPage={setFloatPage}
                        />
                      ) : (
                        <div className="text-tremor-content text-center mt-4">
                          No float values. Click "Convert to Float32".
                        </div>
                      )}
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

export default App;
