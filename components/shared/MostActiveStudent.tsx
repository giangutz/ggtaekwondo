import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/database/models/user.model";

type MostActiveStudentProps = {
  data: {
    _id: string;
    total: number;
  }[];
  users: IUser[];
};

export function MostActiveStudent({ data, users }: MostActiveStudentProps) {
  console.log("data:", data);
  console.log("users:", users);
  return (
    <div className="space-y-4">
      {data.map((item) => {
        const user = users.find((user) => user._id === item._id);
        return user ? (
          <div className="flex flex-col sm:flex-row items-center" key={item._id}>
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.photo} alt="Avatar" />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="mt-2 sm:mt-0 sm:ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.firstName} {user.lastName}
              </p>
              <p className="hidden sm:block text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-auto font-medium">{item.total} Sessions</div>
          </div>
        ) : null;
      })}
    </div>
  );
}
