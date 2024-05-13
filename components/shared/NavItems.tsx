"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemsProps {
  userType: any;
  onNavClick?: () => void;
}

const NavItems = ({ userType, onNavClick }: NavItemsProps) => {
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
                isActive ? "text-orange-500" : "text-primary-500"
              } flex-center p-medium-16 whitespace-nowrap transition-colors duration-200 ease-in-out hover:bg-primary-200 hover:text-primary-500 cursor-pointer`}
              onClick={onNavClick}
            >
              <Link href={link.route}>{link.label}</Link>
            </li>
          );
        })}
    </ul>
  );
};

export default NavItems;
