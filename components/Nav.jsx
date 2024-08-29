import Link from "next/link";
import { usePathname } from "next/navigation";

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
