"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IClass } from "@/lib/database/models/class.model";
import { studentClasses, allClasses } from "@/constants";

type ClassDropdownProps = {
  cls?: boolean;
  value?: string;
  onChangeHandler?: (newClass: string) => void;
};

const ClassDropdown = ({ cls, value, onChangeHandler }: ClassDropdownProps) => {
  let classes = cls ? allClasses : studentClasses;
  // const [classes, setClasses] = useState<IClass[]>([]);
  
  // useEffect(() => {
  //   const getClasses = async () => {
  //     const classList = await getAllClass();
  //     classList && setClasses(classList as IClass[]);
  //   };

  //   getClasses();
  // }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a Class" />
      </SelectTrigger>
      <SelectContent>
        {classes.length > 0 &&
          classes.map((cls) => (
            <SelectItem
              key={cls._id}
              value={cls._id}
              className="select-item p-regular-14"
            >
              {cls.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default ClassDropdown;