import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/solid";
import person from "../../images/avatar.png";
import personicon from "../../images/user (2).png";
import M from "../../images/letter-m.png";

export default function Sidebar() {
  const [per, setPer] = useState(person);
  const currentUser = localStorage.getItem("currentUser");
  const [watchlistName, setWatchlistName] = useState("My Watchlist"); 

  useEffect(() => {
    const storedWatchlistName =
      localStorage.getItem(`watchlistName_${currentUser}`) || "My Watchlist";
    setWatchlistName(storedWatchlistName);
  }, [currentUser]);

  return (
    <div className="fixed top-0 left-0 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center lg:w-64 w-20 hover:w-64 transition-all duration-300 ease-in-out shadow-xl">
      <div className="mb-6 p-4 bg-white text-black dark:bg-gray-900 dark:text-white w-full text-center lg:block">
        <h5 className="block font-sans text-xl font-semibold text-red-500">
          <strong>Watchlists</strong>
        </h5>
      </div>

      <nav className="flex flex-col gap-4 w-full p-2 font-sans text-base font-normal text-gray-700">
        <div className="w-full  block px-4">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md"
              placeholder="Type here..."
            />
          </div>
        </div>

        <Link to="/">
          <div
            role="button"
            tabIndex="0"
            className="flex items-center p-3 w-full lg:bg-red-600 hover:bg-opacity-80 lg:text-white rounded-lg justify-center lg:justify-start"
          >
            <HomeIcon className="h-6 w-6 lg:text-white text-red-600" />
            <span className="ml-4 hidden lg:inline-block text-white">Home</span>
          </div>
        </Link>

        <hr className="w-full hidden lg:block" />

        <h1 className="text-black dark:text-white font-bold pl-4 lg:block hidden">
          My Lists
        </h1>

        <Link to="/watchlists">
          <div
            role="button"
            tabIndex="0"
            className="flex items-center p-3 w-full lg:bg-white hover:bg-red-600 hover:bg-opacity-80 rounded-lg justify-center lg:justify-start"
          >
            <img className="w-8 h-8" src={M} alt="" />
            <span className="ml-4 hidden lg:inline-block text-black dark:text-white">
              {watchlistName}
            </span>
          </div>
        </Link>

        <Link to="/login">
          <div
            role="button"
            tabIndex="0"
            className="flex items-center p-3 w-full lg:bg-white hover:bg-red-600 hover:bg-opacity-80 rounded-lg justify-center lg:justify-start"
          >
            <img
              className="w-10 h-10"
              src={currentUser ? person : personicon}
              alt="thumbnail"
            />
            <span className="ml-3 text-sm  hidden lg:inline-block text-black dark:text-white">
              {currentUser}
            </span>
          </div>
        </Link>
      </nav>
    </div>
  );
}
