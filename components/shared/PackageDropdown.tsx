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
  pkgName?: string;
};

const PackageDropdown = ({
  value,
  onChangeHandler,
  pkgName,
}: PackageDropdownProps) => {
  const [pkg, setPkg] = useState<IPackageDetails[]>([]);

  useEffect(() => {
    const getPackages = async () => {
      const packageList = await getAllPackageDetails();
      setPkg(packageList as IPackageDetails[]);
    };

    getPackages();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={pkgName || value}>
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
      </SelectContent>
    </Select>
  );
};

export default PackageDropdown;
