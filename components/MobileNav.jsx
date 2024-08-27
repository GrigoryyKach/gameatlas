"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";

import { Input } from "./ui/input";

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

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionBoxRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target)) &&
        (inputRef.current && !inputRef.current.contains(event.target))
      ) {
        setTimeout(() => {
          setSuggestions([]);
        }, 1000);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 1) {
      const res = await fetch(`/api/search?term=${term}`);
      const data = await res.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      window.location.href = `/search?query=${searchTerm}`;
    }
  };

  const handleSuggestionClick = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  const getLinkPath = (table, slug) => {
    switch (table) {
      case 'post':
        return `/posts/${slug}`;
      case 'termin':
        return `/terms/${slug}`;
      case 'genre':
        return `/genres/${slug}`;
      case 'platform':
        return `/platforms/${slug}`;
      case 'company':
        return `/companies/${slug}`;
      default:
        return `/`;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="bg-primary flex flex-col items-center">
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

        {/* nav & search bar */}
        <div className="flex flex-col gap-10">
          {/* <div className="xl:hidden relative max-w-[166px]">
            <Input
              ref={inputRef}
              placeholder="Пошук"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleSearch}
            />
            {suggestions.length > 0 && (
              <ul
                ref={suggestionBoxRef}
                className="absolute bg-white w-full text-black mt-1 rounded-md shadow-lg z-1"
              >
                {suggestions.map((suggestion, idx) => (
                  <Link
                    key={idx}
                    href={`${getLinkPath(suggestion.source, suggestion.slug)}`}
                    onClick={handleSuggestionClick}
                  >
                    <li className="p-2 hover:bg-gray-200 rounded-md">
                      {suggestion.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div> */}
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
