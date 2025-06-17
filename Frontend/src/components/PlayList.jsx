
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPlaylist } from "../redux/likeSlice";
import { removeAll } from "../redux/likeSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import Play from "./Play";

const PlayList = () => {
  const likedSongs = useSelector((state) => state.like?.liked) || []; // Ensure it's always an array
  const darkMode = useSelector((state) => state.theme?.darkMode);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  const playSong = (song) => {
    const highestQuality =
      song.downloadUrl?.find((file) => file.quality === "320kbps") ||
      song.downloadUrl[0];

    if (highestQuality) {
      // setCurrentTrack(highestQuality.url);
      setCurrentTrack({ ...song, url: highestQuality.url });

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load(); // Reload audio source
          audioRef.current.play(); // Start playing
        }
      }, 100);
    }
  };

  return (
    <div className={`mt-18 h-screen p-4 ${darkMode ? "bg-[#f5f5f5]" : "bg-black text-white"}`}>
    <div className="flex justify-between py-5">
    <h2 className="text-2xl mb-4">❤️ Liked Songs</h2>
    <button className="bg-green-500 px-2 rounded-lg" 
          onClick={() => dispatch(removeAll())}>
      Remove ALL</button>
    </div>

      {likedSongs.length === 0 ? (
        <p>No liked songs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {likedSongs.map((song) => (
            <div
              key={song.id}
              className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
            >
              {/* Song Image */}
              <img
                src={song.image[2]?.url}
                alt={song.name}
                className="w-20 h-20 rounded"
              />

              {/* Song Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black">{song.name}</h3>
                <p className="text-gray-600">{song.artist}</p>
              </div>

              {/* Play Button */}
              <button
                onClick={() => playSong(song)}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
              >
                <FaPlay size={20} />
              </button>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromPlaylist(song.id))}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Audio Player */}
      {/* {currentTrack && (
        <audio ref={audioRef} controls autoPlay className="mt-4 w-full fixed bottom-0 right-0">
          <source src={currentTrack} type="audio/mp4" />
          Your browser does not support the audio element.
        </audio>
      )} */}


      {currentTrack && <Play song={currentTrack} />}
    </div>
  );
};

export default PlayList;

