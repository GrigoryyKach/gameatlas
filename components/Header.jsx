"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { Input } from "./ui/input";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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

  const getLinkPath = (table, slug) => {
    switch (table) {
      case 'posts':
        return `/posts/${slug}`;
      case 'termins':
        return `/termins/${slug}`;
      case 'genres':
        return `/genres/${slug}`;
      default:
        return `/`;
    }
  };

  return (
    <header className="py-8 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href='/'>
          <Image
            src={'/assets/Logo-bg.svg'}
            width={158}
            height={36}
            alt="logo"
          />
        </Link>

        {/* desktop nav & search bar */}
        <div className="hidden xl:flex justify-between items-center gap-20">
            <Nav />
          <div className="max-w-[166px]">
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleSearch}
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white text-black w-full mt-1 rounded-md shadow-lg">
                {suggestions.map((suggestion, idx) => (
                  <li key={idx} className="p-2 hover:bg-gray-200">
                    <Link href={getLinkPath(suggestion.table, suggestion.slug)}>
                      {suggestion.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
            <MobileNav />
        </div>
      </div>
    </header>
  )
};

export default Header;