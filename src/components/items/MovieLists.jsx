import React, { useEffect, useState } from "react";
import axios from "axios";
import saved from "../../images/bookmark.png";

export default function MovieLists() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userEmail = localStorage.getItem("currentUser");

  const saveWatchlist = (newWatchlist) => {
    localStorage.setItem(
      `watchlist_${userEmail}`,
      JSON.stringify(newWatchlist)
    );
  };

  const handleWatchlistToggle = (movie) => {
    let updatedWatchlist;

    if (watchlist.includes(movie.imdbID)) {
      updatedWatchlist = watchlist.filter((id) => id !== movie.imdbID);
    } else {
      updatedWatchlist = [...watchlist, movie.imdbID];
    }

    setWatchlist(updatedWatchlist);
    saveWatchlist(updatedWatchlist);
  };

  useEffect(() => {
    const storedWatchlist =
      JSON.parse(localStorage.getItem(`watchlist_${userEmail}`)) || [];
    setWatchlist(storedWatchlist);
  }, [userEmail]);

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=33167b82&s=${query}`
      );
      if (response.data.Response === "True") {
        setList(response.data.Search);
      } else {
        setList([]);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("superman");
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      fetchMovies(searchQuery);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col mx-4 ">
      <div className="w-full pt-10">
        <div className="flex flex-col lg:flex-row items-center gap-2">
          <div className="w-full max-w-sm min-w-[200px]">
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
                className="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-700 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Type here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          <button
            className="rounded-md bg-red-700 py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {list.length > 0 ? (
          list.map((movie) => (
            <div
              key={movie.imdbID}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="cursor-pointer">
                <button onClick={() => handleWatchlistToggle(movie)}>
                  <img
                    src={saved}
                    alt="Save to watchlist"
                    className={`w-6 h-6 ${
                      watchlist.includes(movie.imdbID) ? "text-blue-500" : ""
                    }`}
                  />
                </button>
                <img
                  loading="lazy"
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/150"
                  }
                  alt={movie.Title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold cursor-pointer hover:text-blue-600">
                  {movie.Title}
                </h3>
                <div className="mt-2 flex justify-between items-center">
                  <h5 className="text-sm font-bold text-gray-800">
                    {movie.Year}
                  </h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
