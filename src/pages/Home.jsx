import React from "react";
import saved from "../images/bookmark.png";
import MovieLists from "../components/items/MovieLists";

export default function Home() {
  return (
    <div className="flex flex-col bg-white min-h-screen ml-20">
      <div className="w-full p-4 bg-gray-100 border-b border-red-700 rounded-lg mb-4">
        <h1 className="text-xl lg:text-2xl font-bold text-red-700">
          Welcome to <span className="text-red-700">Watchlist</span>
        </h1>
        <p className="mt-2 text-sm lg:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus odit
          iusto nulla. Corporis, cum neque repudiandae vel itaque nostrum
          voluptates.
        </p>
        <span className="inline-block mt-2 text-sm lg:text-base">
          <img
            src={saved}
            alt="thumbnail"
            className="w-4 h-5 lg:w-5 lg:h-6 inline-block mx-1"
          />
          Dolores numquam eum earum, odit et alias ipsa temporibus distinctio.
        </span>
      </div>

      <div className="w-full p-4 lg:pl-8">
        <MovieLists />
      </div>
    </div>
  );
}
