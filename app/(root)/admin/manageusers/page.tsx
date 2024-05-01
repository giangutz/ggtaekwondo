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
  const users = await clerkClient.users.getUserList({ query });

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">
        This page is restricted to users with the Admin role.
      </p>

      <SearchUsers />

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">
                    {user.publicMetadata.name as string}
                  </td>
                  <td className="px-4 py-2">
                    {user.publicMetadata.class as string}
                  </td>
                  <td className="px-4 py-2">
                    {user.publicMetadata.role as string}
                  </td>
                  <td className="px-4 py-2">
                    {user.publicMetadata.role === "student" && (
                      <form action={setRole} className="inline">
                        <input type="hidden" value={user.id} name="id" />
                        <input type="hidden" value="admin" name="role" />
                        <button
                          type="submit"
                          className="bg-orange-500 text-white rounded px-2 py-1 mr-2"
                        >
                          Make Admin
                        </button>
                      </form>
                    )}
                    {user.publicMetadata.role === "admin" && (
                      <form action={setRole} className="inline">
                        <input type="hidden" value={user.id} name="id" />
                        <input type="hidden" value="student" name="role" />
                        <button
                          type="submit"
                          className="bg-green-500 text-white rounded px-2 py-1"
                        >
                          Make Student
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
