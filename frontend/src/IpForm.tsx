import { Button, TextInput } from "@tremor/react";

interface IpFormProps {
  ip: string;
  port: string;
  onIpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPortChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConnect: () => void;
  disabled: boolean;
}

const IpForm = ({
  ip,
  port,
  onIpChange,
  onPortChange,
  onConnect,
  disabled,
}: IpFormProps) => (
  <div className="flex flex-row gap-2 mb-4">
    <TextInput
      className="flex-1 w-full"
      onChange={onIpChange}
      placeholder="Enter IP address"
      value={ip}
    />
    <TextInput
      className="flex-0 w-12"
      onChange={onPortChange}
      placeholder="Enter Port"
      value={port}
    />
    <Button className="flex-0" onClick={onConnect} disabled={disabled}>
      Connect Device
    </Button>
  </div>
);

export default IpForm;
