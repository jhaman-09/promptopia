"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* {Desktop Navigation} */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="./create-prompt" className="black_btn">
            Create Post
          </Link>

          <button type="button" className="outline_btn">
            Sign Out
          </button>

          <Link href={"/profile"}>
            <Image
              className="rounded-full"
              width={27}
              height={37}
              alt="profile"
              src="/assets/images/logo.svg"
            ></Image>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
