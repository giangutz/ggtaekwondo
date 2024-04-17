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

type UserDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const UserDropdown = ({ value, onChangeHandler }: UserDropdownProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  //   const [newCategory, setNewCategory] = useState("");

  //   const handleAddCategory = () => {
  //     createCategory({
  //       categoryName: newCategory.trim(),
  //     }).then((category) => {
  //       setCategories((prevState) => [...prevState, category]);
  //     });
  //   };

  useEffect(() => {
    const getUsers = async () => {
      const userList = await getAllUser();
      console.log(userList);
      userList && setUsers(userList as IUser[]);
    };

    getUsers();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a Student" />
      </SelectTrigger>
      <SelectContent>
        {users.length > 0 &&
          users.map((user) => (
            <SelectItem
              key={user._id}
              value={user._id}
              className="select-item p-regular-14"
            >
              {user.firstName} {user.lastName}
            </SelectItem>
          ))}

        <AlertDialog>
          {/* <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger> */}
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                //   onChange={(e) => setNewCategory(e.target.value)}
                  onChange={(e) => (e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            {/* <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter> */}
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default UserDropdown;
