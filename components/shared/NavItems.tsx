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
  // get value of user type
  while (typeof userType === 'object' && userType !== null) {
    userType = userType.userType;
  }
  
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks
        .filter((link) => link.allowedUsers.includes(userType))
        .map((link) => {
          const isActive = pathname === link.route;

          return (
            <li
              key={link.route}
              className={`${
                isActive && "text-primary-500"
              } flex-center p-medium-16 whitespace-nowrap`}
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
