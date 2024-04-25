import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Input } from "@/components/ui/input";
import { IUser } from "@/lib/database/models/user.model";
import { getAllUser } from "@/lib/actions/user.actions";

type UserDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  classId?: string;
};

const UserDropdown = ({
  value,
  onChangeHandler,
  classId,
}: UserDropdownProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const userList = await getAllUser();
      const filteredUsers = userList.filter(
        (user: IUser) => user.class === classId
      );
      setUsers(filteredUsers as IUser[]);
    };

    getUsers();
  }, [classId]); // Add classId to the dependency array

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a Student" />
      </SelectTrigger>
      <SelectContent>
        {users.length > 0 ? (
          users.map((user) => (
            <SelectItem
              key={user._id}
              value={user._id}
              className="select-item p-regular-14"
            >
              {user.firstName} {user.lastName}
            </SelectItem>
          ))
        ) : (
          <SelectItem
            value="noStudents"
            className="select-item p-regular-14"
            disabled
          >
            No students found
          </SelectItem>
        )}

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
                  onChange={(e) => (e.target.value)}
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

export default UserDropdown;
