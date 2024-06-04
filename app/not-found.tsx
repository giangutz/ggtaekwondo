import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <Image
        src="/assets/images/logo.png"
        width={60}
        height={60}
        alt="Grit & Glory Taekwondo Logo"
        className="pb-8"
      />
      <h1 className="font-extrabold text-9xl tracking-widest text-black">
        404
      </h1>
      <div className="absolute rotate-12 rounded bg-[#FF6A3D] px-2 text-sm">
        Page Not Found
      </div>
      <button className="mt-5">
        {/* <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span> */}

        <span className="relative block rounded-md border border-black bg-white px-8 py-3 text-black shadow-[3px_3px_0px_black] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
          <Link href="/">Go Home</Link>
        </span>
        {/* </a> */}
      </button>
    </main>
  );
}
