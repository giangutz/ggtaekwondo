import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import { IUser } from "@/lib/database/models/user.model";
import { getAllUser } from "@/lib/actions/user.actions";
import { getAllPackageDetails } from "@/lib/actions/packagedetails.actions";
import { IPackageDetails } from "@/lib/database/models/packagedetails.model";

type PackageDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const PackageDropdown = ({ value, onChangeHandler }: PackageDropdownProps) => {
  const pkg = [
    {
      _id: "1",
      name: "12 Sessions",
    },
    {
      _id: "2",
      name: "6 Sessions",
    },
  ]

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a Package" />
      </SelectTrigger>
      <SelectContent>
        {pkg?.map((data: any) => (
          <SelectItem
            key={data.name}
            value={data.name}
            className="select-item p-regular-14"
          >
            {data.name}
          </SelectItem>
        ))}

        {/* <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  //   onChange={(e) => setNewCategory(e.target.value)}
                  onChange={(e) => e.target.value}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </SelectContent>
    </Select>
  );
};

export default PackageDropdown;
