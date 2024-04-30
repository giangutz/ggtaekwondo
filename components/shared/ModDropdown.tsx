import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paidInList } from "@/constants";

type ModDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const ModDropdown = ({ value, onChangeHandler }: ModDropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Mode of Payment" />
      </SelectTrigger>
      <SelectContent>
        {paidInList.map((data) => (
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

export default ModDropdown;
