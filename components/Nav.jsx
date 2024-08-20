"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

const Nav = () => {
  const pathName = usePathname();

  return (
    <nav className="flex gap-10">
      {links.map((link, idx) => {
        return (
          <Link
            key={idx}
            href={link.path}
            className={`${link.path === pathName && "text-accent border-b-2 border-accent"} capitalize font-medium hover:text-accent transition-all`}
          >
          {link.name}
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav;
