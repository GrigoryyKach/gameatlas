"use client";

import Link from "next/link";
import Image from "next/image";

// components
import Nav from "./Nav";
import { Input } from "./ui/input";

const Header = () => {
  return (
    <header className="py-8 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href='/'>
          <Image
            src={'/assets/Logo.png'}
            width={158}
            height={36}
            alt="logo"
          />
        </Link>

        {/* desktop nav & search bar */}
          <Nav />
        <div className="max-w-[166px]">
          <Input
            placeholder="Search"
          />
        </div>
      </div>
    </header>
  )
};

export default Header;