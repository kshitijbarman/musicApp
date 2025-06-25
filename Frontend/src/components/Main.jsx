import React, { useEffect, useState } from "react";
import axios from "axios";
import Slidebar from "./Slidebar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToPlaylist } from "../redux/likeSlice";
import Play from "./Play";

const Main = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const searchQuery = useSelector((state) => state.search.query.toLowerCase());
  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  // const [liked,setLiked]=useState(false)
  const [likedSongs, setLikedSongs] = useState(new Set());

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          "https://saavn.dev/api/search/songs?limit=40",
          { params: { query: searchQuery || "Bollywood" } }
        );
        setSearchResults(data.data.results || []);
      } catch (err) {
        setError("Failed to fetch songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [searchQuery]);

  useEffect(() => {
    const savedLikes = localStorage.getItem("likedSongs");
    if (savedLikes) {
      setLikedSongs(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  const playSong = (song) => {
    const highestQuality =
      song.downloadUrl?.find((file) => file.quality === "320kbps") ||
      song.downloadUrl[0];

    if (highestQuality) {
      setCurrentTrack({
        url: highestQuality.url,
        name: song.name,
        artist: song.primaryArtists,
        image: song.image[2]?.url,
      });
    }
  };

  const sendData = (data) => {
    dispatch(addToPlaylist(data));
    alert("Song added to playlist");
  };

  // const handleLike=(id)=>{
  //   setLiked(!liked)
  // }

  const handleLike = (id) => {
    setLikedSongs((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      localStorage.setItem("likedSongs", JSON.stringify(Array.from(updated)));
      return updated;
    });
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-[#f5f5f5]" : "bg-black text-white"
        }`}
      >
        <p className="text-xl animate-pulse">Loading songs...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex pb-20 ${
        darkMode ? "bg-[#f5f5f5]" : "bg-black text-white"
      }`}
    >
      <div className="hidden xl:block fixed">
        <Slidebar />
      </div>

      <div className="p-4 min-h-screen pt-25 xl:ml-[16rem]">
        <h2 className="text-2xl mb-4">Music Player 🎵</h2>

        {loading && <p>Loading songs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {searchResults.map((song) => (
              <li
                key={song.id}
                className={`flex items-center space-x-4 cursor-pointer  p-2 rounded-lg shadow-md ${
                  darkMode ? "bg-[#f5f5f5]" : "bg-black   shadow-gray-400"
                }`}
              >
                <img
                  src={song.image[2]?.url}
                  alt={song.name}
                  className="w-24 md:w-30 rounded"
                  onClick={() => playSong(song)}
                />
                <button
                  onClick={() => playSong(song)}
                  className="bg-green-500 rounded-4xl px-5 py-1 text-white"
                >
                  Play
                </button>
                {/* <button className="text-2xl cursor-pointer" onClick={() =>{sendData(song);handleLike(song.id)}}>
                  <FaRegHeart  className={liked?"bg-red-600":"bg-white"}/>
                </button> */}

                <button
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    sendData(song);
                    handleLike(song.id);
                  }}
                >
                  {likedSongs.has(song.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="" />
                  )}
                </button>

                {/* <span
                  className={` ${
                    darkMode ? "bg-[#f5f5f5]" : "bg-black text-white"
                  }`}
                >
                  {song.name}
                </span> */}
                <span
                  className={`inline-block max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm rounded px-2 py-1 ${
                    darkMode ? "bg-[#f5f5f5] text-black" : "bg-black text-white"
                  }`}
                >
                  {song.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ✅ Pass song object to Play component */}
      {currentTrack && <Play song={currentTrack} />}
    </div>
  );
};

export default Main;
