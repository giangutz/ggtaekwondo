import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/database/models/user.model";
import Link from "next/link";

type MostActiveStudentProps = {
  data: {
    _id: string;
    total: number;
  }[];
  users: IUser[];
};

export function MostActiveStudent({ data, users }: MostActiveStudentProps) {
  // console.log("data:", data);
  // console.log("users:", users);
  return (
    <div className="space-y-4">
      {data.map((item) => {
        const user = users.find((user) => user._id === item._id);
        return user ? (
          <Link
            className="flex flex-col items-center sm:flex-row"
            href={`/dashboard/${item._id}`}
            key={item._id}
            passHref
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.photo} alt="Avatar" />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="mt-2 space-y-1 sm:ml-4 sm:mt-0">
              <p className="text-sm font-medium leading-none">
                {user.firstName} {user.lastName}
              </p>
              <p className="hidden text-sm text-muted-foreground sm:block">
                {user.email}
              </p>
            </div>
            <div className="mt-2 font-medium sm:ml-auto sm:mt-0">
              {item.total} Sessions
            </div>
          </Link>
        ) : null;
      })}
    </div>
  );
}
