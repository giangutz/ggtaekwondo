import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionType } from "@/constants";

type TransactionDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const TransactionTypeDropdown = ({
  value,
  onChangeHandler,
}: TransactionDropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a Transaction Type" />
      </SelectTrigger>
      <SelectContent>
        {TransactionType.map((data) => (
          <SelectItem
            key={data}
            value={data}
            className="select-item p-regular-14"
          >
            {data}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TransactionTypeDropdown;
