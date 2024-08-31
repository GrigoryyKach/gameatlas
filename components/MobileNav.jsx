"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

// components
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const links = [
  {
    name: "головна",
    path: "/",
  },
  {
    name: "пости",
    path: "/posts",
  },
  {
    name: "новини",
    path: "/news",
  },
  {
    name: "жанри",
    path: "/genres",
  },
  {
    name: "платформи",
    path: "/platforms",
  },
  {
    name: "терміни",
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
      <SheetContent className="bg-primary flex flex-col items-center gap-10">
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
        <div className="flex flex-col gap-10">
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
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav;
