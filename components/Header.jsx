"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { IoSearchCircleOutline } from "react-icons/io5";
import { Input } from "./ui/input";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionBoxRef = useRef(null);

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
      case 'Post':
        return `/posts/${slug}`;
      case 'Term':
        return `/terms/${slug}`;
      case 'Genre':
        return `/genres/${slug}`;
      case 'Platform':
        return `/platforms/${slug}`;
      case 'Company':
        return `/companies/${slug}`;
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

        {/* desktop nav & desktop search bar */}
        <div className="hidden xl:flex justify-between items-center gap-20">
          <Nav />
        </div>
        <div className="hidden xl:flex relative max-w-[166px]">
          <Input
            ref={inputRef}
            placeholder="Пошук"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleSearch}
          />
          <IoSearchCircleOutline
            className={`${searchTerm && "hidden"} text-text text-3xl absolute right-1 top-1 pointer-events-none`}
          />
          {suggestions.length > 0 && (
            <ul
              ref={suggestionBoxRef}
              className="absolute z-10 bg-white w-full text-black top-10 rounded-md shadow-lg"
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
        </div>

        {/* mobile nav & search bar */}
        <div className="xl:hidden relative max-w-[100px] md:max-w-[166px]">
          <Input
            ref={inputRef}
            placeholder="Пошук"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleSearch}
          />
          <IoSearchCircleOutline
            className={`${searchTerm && "hidden"} text-text text-2xl md:text-3xl absolute right-2 md:right-1 top-2 md:top-1 pointer-events-none`}
          />
          {suggestions.length > 0 && (
            <ul
              ref={suggestionBoxRef}
              className="absolute z-10 bg-white w-full text-black mt-1 rounded-md shadow-lg z-1"
            >
              {suggestions.map((suggestion, idx) => (
                <Link
                  key={idx}
                  href={`${getLinkPath(suggestion.source, suggestion.slug)}`}
                  onClick={handleSuggestionClick}
                >
                  <li className="p-2 hover:bg-gray-200 rounded-md text-base">
                    {suggestion.title}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  )
};

export default Header;