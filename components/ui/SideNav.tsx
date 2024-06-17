"use client";
import React from "react";
import { lmsLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 rounded-md border px-4 py-8 text-black shadow-md">
      <h2 className="mb-8 text-xl font-semibold">LMS Dashboard</h2>
      <ul className="space-y-4">
        {lmsLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <li key={link.label} className="flex-start p-medium-16 cursor-pointer whitespace-nowrap">
              <Link
                href={link.route}
                className={`block transition-colors duration-200 ease-in-out ${
                  isActive ? "border-b-2 border-[#ff571b]" : "hover:border-b-2 hover:border-[#ff571b] text-primary-500"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;