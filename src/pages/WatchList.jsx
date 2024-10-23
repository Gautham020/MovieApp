import React, { useEffect, useState } from "react";
import axios from "axios";
import saved from "../images/bookmark.png";
import check from "../images/check.png";
import edit from "../images/edit.png";

export default function MovieLists() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistName, setWatchlistName] = useState("My Watchlist");
  const [searchQuery, setSearchQuery] = useState("");

  const userEmail = localStorage.getItem("currentUser");

  const saveWatchlist = (newWatchlist) => {
    localStorage.setItem(
      `watchlist_${userEmail}`,
      JSON.stringify(newWatchlist)
    );
  };

  const saveWatchlistName = (name) => {
    localStorage.setItem(`watchlistName_${userEmail}`, name);
    setWatchlistName(name);
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

    const storedWatchlistName =
      localStorage.getItem(`watchlistName_${userEmail}`) || "My Watchlist";
    setWatchlistName(storedWatchlistName);
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
    fetchMovies("movie");
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

  const handleEditWatchlistName = () => {
    const newName = prompt("Enter new watchlist name:", watchlistName);
    if (newName) {
      saveWatchlistName(newName);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="w-full border rounded-lg p-4 mb-4 bg-gray-100 border-red-700">
        <h1 className="text-lg md:text-2xl font-bold text-red-700 flex items-center">
          {watchlistName}{" "}
          <button
            onClick={handleEditWatchlistName}
            className="focus:outline-none ml-2"
          >
            <img
              src={edit}
              alt="Edit Watchlist"
              className="w-4 h-4 md:w-5 md:h-5"
            />
          </button>
        </h1>
        <h3 className="text-sm md:text-base font-semibold mt-2">
          About This Watchlist
        </h3>
        <p className="mt-2 text-xs md:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis.
          <img
            src={saved}
            alt="thumbnail"
            className="w-4 h-4 md:w-5 md:h-6 inline-block mx-1"
          />
          dolores numquam eum earum, odit et alias ipsa temporibus distinctio.
        </p>
      </div>

      <div className="flex flex-wrap -mx-2">
        {list.length > 0 ? (
          list
            .filter((movie) => watchlist.includes(movie.imdbID))
            .map((movie) => (
              <div
                key={movie.imdbID}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              >
                <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleWatchlistToggle(movie)}
                    className="absolute top-2 right-2"
                  >
                    <img
                      src={check}
                      alt="Toggle Watchlist"
                      className={`w-5 h-5 ${
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
                  <div className="p-2">
                    <h3 className="text-sm md:text-lg font-semibold">
                      {movie.Title}
                    </h3>
                    <div className="mt-1">
                      <span className="text-xs md:text-sm font-medium">
                        {movie.Year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="w-full text-center">
            No movies found in your watchlist.
          </p>
        )}
      </div>
    </div>
  );
}
