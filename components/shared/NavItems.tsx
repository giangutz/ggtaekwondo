"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface NavItemsProps {
  userType: any;
  onNavClick?: () => void;
}

const NavItems = ({ userType, onNavClick }: NavItemsProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [closeDropdownTimeout, setCloseDropdownTimeout] =
    useState<NodeJS.Timeout | number | undefined | null>();
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks
        .filter((link) => link.allowedUsers.includes(userType.userType))
        .map((link) => {
          const isActive = pathname === link.route;

          return (
            <li
              key={link.route}
              className={`${
                isActive ? "border-b-2 border-[#ff571b]" : "text-primary-500"
              } flex-center p-medium-16 whitespace-nowrap transition-colors duration-200 ease-in-out hover:border-b-2 hover:border-[#ff571b] cursor-pointer`}
              onMouseEnter={() => {
                if (link.label === "Admin Dashboard") {
                  clearTimeout(closeDropdownTimeout as NodeJS.Timeout);
                  setDropdownOpen(true);
                }
              }}
              onMouseLeave={() => {
                if (link.label === "Admin Dashboard") {
                  setCloseDropdownTimeout(
                    setTimeout(() => {
                      setDropdownOpen(false);
                    }, 300)
                  );
                }
              }}
            >
              <Link href={link.route}>{link.label}</Link>
              {link.label === "Admin Dashboard" && dropdownOpen && (
                <div className="absolute left-0 top-8 bg-white border border-gray-200 shadow-md mt-2 w-48 rounded-md overflow-hidden z-10">
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    href="/admin/users"
                  >
                    Manage Users
                  </Link>
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default NavItems;
