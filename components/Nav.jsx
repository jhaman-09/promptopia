"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showSignInOptions, setShowSignInOptions] = useState(false); // For toggle sign-in options

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  

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

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href={`/profile/${session?.user.id}`}>
              <Image
                src={
                  session?.user.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoqE5w5oSzJ5hkVXlqk9GW5aC--Jc97eU5bA&s"
                }
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setShowSignInOptions(!showSignInOptions)} // Toggle sign-in options
              className="black_btn"
            >
              Sign Up / Sign In
            </button>

            {/* Sign-In Options (Dropdown) */}
            {showSignInOptions && (
              <div className="absolute bg-white shadow-md p-4 mt-2 rounded-lg">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className={
                        provider.name === "Google" ? "blue_btn" : "black_btn"
                      }
                    >
                      Sign In with {provider.name}
                    </button>
                  ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={
                session?.user.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoqE5w5oSzJ5hkVXlqk9GW5aC--Jc97eU5bA&s"
              }
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={`/profile/session?.user.id`}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setShowSignInOptions(!showSignInOptions)} // Toggle sign-in options
              className="black_btn"
            >
              Sign Up / Sign In
            </button>

            {/* Sign-In Options (Dropdown) */}
            {showSignInOptions && (
              <div className="absolute bg-white shadow-md p-4 mt-2 rounded-lg">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className={
                        provider.name === "Google" ? "blue_btn" : "black_btn"
                      }
                    >
                      Sign In with {provider.name}
                    </button>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
