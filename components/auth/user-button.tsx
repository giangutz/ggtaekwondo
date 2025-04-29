"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";

type UserButtonProps = {
  afterSignOutUrl?: string;
};

export function UserButton({ afterSignOutUrl = "/" }: UserButtonProps) {
  return (
    <ClerkUserButton
      afterSignOutUrl={afterSignOutUrl}
      appearance={{
        elements: {
          userButtonAvatarBox: "w-10 h-10"
        }
      }}
    />
  );
}
