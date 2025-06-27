import { Button, TextInput } from "@tremor/react";

interface AddressFormProps {
  startRegister: string;
  quantity: string;
  onStartChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRead: () => void;
  loading: boolean;
  disabled: boolean;
}

const AddressForm = ({
  startRegister,
  quantity,
  onStartChange,
  onQuantityChange,
  onRead,
  loading,
  disabled,
}: AddressFormProps) => (
  <div className="flex flex-row gap-2">
    <TextInput
      className="flex-1"
      placeholder="Starting Register"
      value={startRegister}
      onChange={onStartChange}
      type="number"
      min={0}
    />
    <TextInput
      className="flex-1"
      placeholder="Quantity"
      value={quantity}
      onChange={onQuantityChange}
      type="number"
      min={1}
    />
    <Button
      className="flex-0"
      onClick={onRead}
      loading={loading}
      disabled={disabled}
    >
      Read
    </Button>
  </div>
);

export default AddressForm;
