import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseCategory } from "@/constants";

type ExpenseSourceDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const ExpenseDropdown = ({
  value,
  onChangeHandler,
}: ExpenseSourceDropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select an Expense Category" />
      </SelectTrigger>
      <SelectContent>
        {ExpenseCategory.map((source) => (
          <SelectItem
            key={source}
            value={source}
            className="select-item p-regular-14"
          >
            {source}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ExpenseDropdown;
