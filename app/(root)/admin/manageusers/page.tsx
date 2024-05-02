import { redirect } from "next/navigation";
import { checkRole } from "@/lib/utils";
import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs/server";
import { setRole } from "./_action";

export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  // Fetch all users if no search query is provided, otherwise fetch users based on the search query
  const users = query ? await clerkClient.users.getUserList({ query }) : [];

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">
        This page is restricted to users with the Admin role.
      </p>

      <SearchUsers />

      {users.map((user) => {
        return (
          <div key={user.id}>
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>
            <div>{user.publicMetadata.role as string}</div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button type="submit">Make Admin</button>
              </form>
            </div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <button type="submit">Make Moderator</button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
