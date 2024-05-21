import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = (userType: any) => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="w-12">
            <Image
              src="/assets/images/logo.png"
              width={128}
              height={38}
              alt="Grit & Glory Taekwondo logo"
            />
          </Link>
          <div className="zuume-black text-center">GRIT&GLORY<br/>TAEKWONDO</div>
        </div>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems userType={userType} />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav userType={userType} />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
