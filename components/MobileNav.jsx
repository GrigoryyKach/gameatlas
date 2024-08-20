"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";

const links = [
  {
    name: "Главная",
    path: "/",
  },
  {
    name: "Посты",
    path: "/posts",
  },
  {
    name: "Жанры",
    path: "/genres",
  },
  {
    name: "Платформы",
    path: "/platforms",
  },
  {
    name: "Термины",
    path: "/terms",
  },
]

const MobileNav = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="bg-primary flex flex-col">
        {/* logo */}
        <div className="mb-30 flex justify-center">
          <Link href={'/'}>
            <Image
              src={'/assets/Logo3.png'}
              width={200}
              className="w-full"
              height={100}
              alt="logo"
            />
          </Link>
        </div>

        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, idx) => {
            return (
              <Link
                href={link.path}
                key={idx}
                className={`${link.path === pathName && "text-accent border-b-2 border-accent"} text-xl capitalize hover:text-accent transition-all`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav;
