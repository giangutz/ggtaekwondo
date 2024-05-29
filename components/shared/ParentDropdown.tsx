"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { roles } from "@/constants";
import { getAllUserByRole } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";

type ParentDropdownProps = {
  value?: string;
  onChangeHandler?: (newRole: string) => void;
};

const ParentDropdown = ({ value, onChangeHandler }: ParentDropdownProps) => {
  const [parent, setParent] = useState<IUser[]>([]);  
  // const [role, setRole] = useState<IUserType[]>([]);

  useEffect(() => {
    const getParent = async () => {
      const parents = await getAllUserByRole("parent");
      roles && setParent(parents as any);
    };

    getParent();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a Parent" />
      </SelectTrigger>
      <SelectContent>
        {parent.length > 0 &&
          parent.map((pr) => (
            <SelectItem
              key={pr._id}
              value={pr._id}
              className="select-item p-regular-14"
            >
              {pr.firstName} {pr.lastName}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default ParentDropdown;