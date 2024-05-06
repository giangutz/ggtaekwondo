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
import { ITransaction } from "@/lib/database/models/transactions.model";
import { Input } from "@/components/ui/input";

type UserDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  classId?: string;
  transac?: ITransaction;
};

const UserDropdown = ({
  value,
  onChangeHandler,
  classId,
  transac,
}: UserDropdownProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const userList = await getAllUser();
      const filteredUsers = userList.filter(
        (user: IUser) =>
          user.class === classId || user._id === transac?.studentId
      );
      setUsers(filteredUsers as IUser[]);
    };

    getUsers();
  }, [classId]); // Add classId to the dependency array

  return (
    <>
      {transac ? (
        (() => {
          const user = users.find((user) => user._id === transac.studentId);
          return (
            <Input
              value={user ? `${user.firstName} ${user.lastName}` : ""}
              disabled
              className="select-field"
            />
          );
        })()
      ) : (
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
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default UserDropdown;
