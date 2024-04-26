"use client";

import { usePathname, useRouter } from "next/navigation";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
        className="flex items-center bg-white rounded-lg shadow p-2"
      >
        <label htmlFor="search" className="sr-only">Search for Users</label>
        <input id="search" name="search" type="text" className="flex-grow rounded-lg p-2 outline-none" placeholder="Search for Users" />
        <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2">Submit</button>
      </form>
    </div>
  );
};