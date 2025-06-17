// import { useRef, useState, useEffect } from "react";
// import { BiRepeat } from "react-icons/bi";
// import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
// import { PiShuffleBold } from "react-icons/pi";
// import { FaPlay, FaPause } from "react-icons/fa";
// import { HiSpeakerWave } from "react-icons/hi2";
// import { LuHardDriveDownload } from "react-icons/lu";

// const Play = ({ song }) => {

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.addEventListener("timeupdate", updateProgress);
//       audioRef.current.addEventListener("loadedmetadata", updateDuration);
//       return () => {
//         audioRef.current.removeEventListener("timeupdate", updateProgress);
//         audioRef.current.removeEventListener("loadedmetadata", updateDuration);
//       };
//     }
//   }, [song]);

//   const updateProgress = () => {
//     setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
//   };

//   const updateDuration = () => {
//     setDuration(audioRef.current.duration);
//   };

//   const togglePlayPause = () => {
//     if (!song) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleSeek = (e) => {
//     const seekTime = (e.target.value / 100) * duration;
//     audioRef.current.currentTime = seekTime;
//     setProgress(e.target.value);
//   };

//   return (
//     <div className="fixed bottom-0 right-0 left-0 bg-[#f5f5f5ff] flex flex-col">
//       <input
//         type="range"
//         name="progress"
//         id="progress"
//         min={0}
//         max={100}
//         step="0.1"
//         value={0}
//         className="w-full h-[5px] text-green-400 range"
//       />
//       <div className="flex justify-between items-center mb-3 px-3">
//         {/* 1st div */}
//         <div className="flex justify-start items-center gap-3 lg:w-[30vw]">
//           <img
//             src="/placeholder.jpg"
//             alt="Song Cover"
//             width={55}
//             className="rounded-lg"
//           />
//           <div className="hidden lg:block">
//             <span>Song Name</span>
//             <p className="text-xs text-gray-500">Artist Name</p>
//           </div>
//         </div>

//         {/* 2nd div */}
//         <div className="flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center">
//           <BiRepeat className="text-gray-400 cursor-pointer" />
//           <IoMdSkipBackward className="text-gray-700 hover:text-gray-500 cursor-pointer" />
//           <FaPlay className="text-gray-700 hover:text-gray-500 cursor-pointer" />
//           <IoMdSkipForward className="text-gray-700 hover:text-gray-500 cursor-pointer" />
//           <PiShuffleBold className="text-gray-400 cursor-pointer" />
//         </div>

//         {/* 3rd div */}
//         <div className="flex lg:w-[30vw] justify-end items-center">
//           <LuHardDriveDownload className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer lg:mr-2" />
//           <HiSpeakerWave className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer hidden lg:block" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Play;




























// 1

// import React, { useRef, useState } from "react";
// import { BiRepeat } from "react-icons/bi";
// import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
// import { PiShuffleBold } from "react-icons/pi";
// import { FaPlay, FaPause } from "react-icons/fa";
// import { HiSpeakerWave } from "react-icons/hi2";
// import { LuHardDriveDownload } from "react-icons/lu";

// const Play = ({ song }) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1); // 1 = 100%

//   const togglePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // **Update progress bar as song plays**
//   const handleTimeUpdate = () => {
//     if (audioRef.current) {
//       const progressPercentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
//       setProgress(progressPercentage);
//     }
//   };

//   // **Seek song position**
//   const handleSeek = (e) => {
//     const newTime = (e.target.value * audioRef.current.duration) / 100;
//     audioRef.current.currentTime = newTime;
//     setProgress(e.target.value);
//   };

//   // **Adjust volume**
//   const handleVolumeChange = (e) => {
//     const newVolume = e.target.value;
//     audioRef.current.volume = newVolume;
//     setVolume(newVolume);
//   };

//   return (
//     <div className="fixed bottom-0 right-0 left-0 bg-[#f5f5f5ff] flex flex-col">
//       {/* ✅ Progress Bar (Seek) */}
//       <input
//         type="range"
//         min="0"
//         max="100"
//         step="0.1"
//         value={progress}
//         onChange={handleSeek}
//         className="w-full h-[5px] text-green-400 range"
//       />

//       <div className="flex justify-between items-center mb-3 px-3">
//         {/* ✅ Song Info */}
//         <div className="flex justify-start items-center gap-3 lg:w-[30vw]">
//           <img src={song.image} alt={song.name} width={55} className="rounded-lg" />
//           <div>
//             <span className="text-black">{song.name}</span>
//             <p className="text-xs text-gray-500">{song.artist}</p>
//           </div>
//         </div>

//         {/* ✅ Player Controls */}
//         <div className="flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center">
//           <BiRepeat className="text-gray-400 cursor-pointer" />
//           <IoMdSkipBackward className="text-gray-700 hover:text-gray-500 cursor-pointer" />
//           <button onClick={togglePlayPause} className="text-gray-700 hover:text-gray-500 cursor-pointer">
//             {isPlaying ? <FaPause /> : <FaPlay />}
//           </button>
//           <IoMdSkipForward className="text-gray-700 hover:text-gray-500 cursor-pointer" />
//           <PiShuffleBold className="text-gray-400 cursor-pointer" />
//         </div>

//         {/* ✅ Volume & Download */}
//         <div className="flex lg:w-[30vw] justify-end items-center gap-3">
//           {/* ✅ Download Button */}
//           <a href={song.url} download className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer">
//             <LuHardDriveDownload />
//           </a>

//           {/* ✅ Volume Control */}
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.1"
//             value={volume}
//             onChange={handleVolumeChange}
//             className="w-20 hidden lg:block"
//           />
//           <HiSpeakerWave className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer" />
//         </div>
//       </div>

//       {/* ✅ Audio Element */}
//       <audio ref={audioRef} src={song.url} onTimeUpdate={handleTimeUpdate} />
//     </div>
//   );
// };

// export default Play;




// 2
import React, { useRef, useState, useEffect } from "react";
import { BiRepeat } from "react-icons/bi";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { PiShuffleBold } from "react-icons/pi";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { LuHardDriveDownload } from "react-icons/lu";

const Play = ({ song, songList, setCurrentSongIndex }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // 1 = 100%

  // **Reset Audio When Song Changes**
  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.src = song.url; // Set new song URL
      audioRef.current.load(); // Reload the audio element
      audioRef.current.play(); // Auto-play new song
      setIsPlaying(true);
    }
  }, [song]); // ✅ Dependency: Runs when the song changes

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // **Update progress bar**
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercentage =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercentage);
    }
  };

  // **Seek song position**
  const handleSeek = (e) => {
    const newTime = (e.target.value * audioRef.current.duration) / 100;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  // **Adjust volume**
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // **Handle Next & Previous**
  const handleNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex + 1 < songList.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : songList.length - 1
    );
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-[#f5f5f5ff] flex flex-col">
      {/* ✅ Progress Bar (Seek) */}
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={progress}
        onChange={handleSeek}
        className="w-full h-[5px] text-green-400 range"
      />

      <div className="flex justify-between items-center mb-3 px-3">
        {/* ✅ Song Info */}
        <div className="flex justify-start items-center gap-3 lg:w-[30vw]">
          {song && (
            <>
              <img
                src={song.image}
                alt={song.name}
                width={55}
                className="rounded-lg"
              />
              <div>
                <span className="text-black">{song.name}</span>
                <p className="text-xs text-gray-500">{song.artist}</p>
              </div>
            </>
          )}
        </div>

        {/* ✅ Player Controls */}
        <div className="flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center">
          <BiRepeat className="text-gray-400 cursor-pointer" />
          <IoMdSkipBackward
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
            onClick={handlePrevious}
          />
          <button
            onClick={togglePlayPause}
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <IoMdSkipForward
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
            onClick={handleNext}
          />
          <PiShuffleBold className="text-gray-400 cursor-pointer" />
        </div>

        {/* ✅ Volume & Download */}
        <div className="flex lg:w-[30vw] justify-end items-center gap-3">
          {/* ✅ Download Button */}
          {song && (
            <a
              href={song.url}
              download
              className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer"
            >
              <LuHardDriveDownload />
            </a>
          )}

          {/* ✅ Volume Control */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 hidden lg:block"
          />
          <HiSpeakerWave className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer" />
        </div>
      </div>

      {/* ✅ Audio Element */}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </div>
  );
};

export default Play;























// import React, { useRef, useEffect, useState } from "react";
// import { BiRepeat } from "react-icons/bi";
// import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
// import { PiShuffleBold } from "react-icons/pi";
// import { FaPlay, FaPause } from "react-icons/fa";
// import { HiSpeakerWave } from "react-icons/hi2";
// import { LuHardDriveDownload } from "react-icons/lu";

// const Play = ({ songs, currentSongIndex, setCurrentSongIndex }) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);

//   const currentSong = songs[currentSongIndex];

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.load();
//       if (isPlaying) {
//         audioRef.current.play();
//       }
//     }
//   }, [currentSongIndex]);

//   const togglePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (audioRef.current) {
//       const progressPercentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
//       setProgress(progressPercentage);
//     }
//   };

//   const handleSeek = (e) => {
//     const newTime = (e.target.value * audioRef.current.duration) / 100;
//     audioRef.current.currentTime = newTime;
//     setProgress(e.target.value);
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = e.target.value;
//     audioRef.current.volume = newVolume;
//     setVolume(newVolume);
//   };

//   const playNext = () => {
//     setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
//     setIsPlaying(true);
//   };

//   const playPrevious = () => {
//     setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
//     setIsPlaying(true);
//   };

//   return (
//     <div className="fixed bottom-0 right-0 left-0 bg-[#f5f5f5ff] flex flex-col">
//       <input
//         type="range"
//         min="0"
//         max="100"
//         step="0.1"
//         value={progress}
//         onChange={handleSeek}
//         className="w-full h-[5px] text-green-400 range"
//       />

//       <div className="flex justify-between items-center mb-3 px-3">
//         <div className="flex justify-start items-center gap-3 lg:w-[30vw]">
//           <img src={currentSong.image[2]?.url} alt={currentSong.name} width={55} className="rounded-lg" />
//           <div>
//             <span className="text-black">{currentSong.name}</span>
//             <p className="text-xs text-gray-500">{currentSong.artist}</p>
//           </div>
//         </div>

//         <div className="flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center">
//           <BiRepeat className="text-gray-400 cursor-pointer" />
//           <IoMdSkipBackward onClick={playPrevious} className="text-gray-700 hover:text-gray-500 cursor-pointer" />
//           <button onClick={togglePlayPause} className="text-gray-700 hover:text-gray-500 cursor-pointer">
//             {isPlaying ? <FaPause /> : <FaPlay />}
//           </button>
//           <IoMdSkipForward onClick={playNext} className="text-gray-700 hover:text-gray-500 cursor-pointer" />
//           <PiShuffleBold className="text-gray-400 cursor-pointer" />
//         </div>

//         <div className="flex lg:w-[30vw] justify-end items-center gap-3">
//           <a href={currentSong.downloadUrl[0]?.url} download className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer">
//             <LuHardDriveDownload />
//           </a>

//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.1"
//             value={volume}
//             onChange={handleVolumeChange}
//             className="w-20 hidden lg:block"
//           />
//           <HiSpeakerWave className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer" />
//         </div>
//       </div>

//       <audio ref={audioRef} src={currentSong.downloadUrl[0]?.url} onTimeUpdate={handleTimeUpdate} autoPlay />
//     </div>
//   );
// };

// export default Play;
