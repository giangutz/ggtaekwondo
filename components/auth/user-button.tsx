"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type UserButtonProps = {
  afterSignOutUrl?: string;
};

export function UserButton({ afterSignOutUrl = "/" }: UserButtonProps) {
  const router = useRouter();

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
