import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IncomeSource } from '@/constants';

type IncomeSourceDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const IncomeSourceDropdown = ({ value, onChangeHandler }: IncomeSourceDropdownProps ) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select an Income Source" />
      </SelectTrigger>
      <SelectContent>
        {IncomeSource.map((source) => (
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
  )
}

export default IncomeSourceDropdown