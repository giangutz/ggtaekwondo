"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IUserType } from "@/lib/database/models/usertype.model";
import { getAllUserTypes } from "@/lib/actions/usertype.actions";

type RoleDropdownProps = {
  value?: string;
  onChangeHandler?: (newRole: string) => void;
};

const RoleDropdown = ({ value, onChangeHandler }: RoleDropdownProps) => {
  const [role, setRole] = useState<IUserType[]>([]);

  useEffect(() => {
    const getRole = async () => {
      const roles = await getAllUserTypes();
      roles && setRole(roles as IUserType[]);
    };

    getRole();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a Role" />
      </SelectTrigger>
      <SelectContent>
        {role.length > 0 &&
          role.map((rle) => (
            <SelectItem
              key={rle.name}
              value={rle.name}
              className="select-item p-regular-14"
            >
              {rle.name.charAt(0).toUpperCase() + rle.name.slice(1)}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default RoleDropdown;