// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Artist = () => {
//   const searchQuery = useSelector((state) => state.search.query); // Get artist name from Redux store
//   const [artists, setArtists] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchArtists = async () => {
//       if (!searchQuery) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const { data } = await axios.get("https://saavn.dev/api/search/artists", {
//           params: { query: searchQuery },
//         });
//         setArtists(data.data.results || []);
//       } catch (err) {
//         setError("Failed to fetch artists");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArtists();
//   }, [searchQuery]);

//   return (
//     <div className="p-4 min-h-screen">
//       <h2 className="text-2xl mb-4">Artists 🎤</h2>

//       {loading && <p>Loading artists...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {artists.map((artist) => (
//           <div key={artist.id} className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
//             <img
//               src={artist.image[2]?.url || "https://www.jiosaavn.com/_i/3.0/artist-default-music.png"}
//               alt={artist.name}
//               className="w-32 h-32 rounded-full mb-2"
//             />
//             <h3 className="text-lg font-semibold">{artist.name}</h3>
//             <a
//               href={artist.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 mt-1"
//             >
//               View on JioSaavn
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Artist;













import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Play from "./Play";  // Ensure you have a Play component for playing songs

const Artist = () => {
  const searchQuery = useSelector((state) => state.search.query); // Get artist name from Redux store
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);  // Store songs of the selected artist
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);  // For audio playback

  const defaultArtist = "Arijit Singh"; // Default artist name

  // Fetch artists based on searchQuery or use default artist if query is empty
  useEffect(() => {
    const fetchArtists = async () => {
      const query = searchQuery || defaultArtist; // Use default artist if searchQuery is empty
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get("https://saavn.dev/api/search/artists", {
          params: { query: query },
        });
        setArtists(data.data.results || []);
      } catch (err) {
        setError("Failed to fetch artists");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [searchQuery]);

  // Fetch songs for a selected artist
  const fetchSongs = async (artistId) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`https://saavn.dev/api/artist/songs/${artistId}`, {
        params: { limit: 10 },  // Limit the number of songs
      });
      setSongs(data.data.songs || []);
    } catch (err) {
      setError("Failed to fetch songs");
    } finally {
      setLoading(false);
    }
  };

  // Handle song click for playback
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

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-2xl mb-4">Artists 🎤</h2>

      {loading && <p>Loading artists...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center cursor-pointer"
            onClick={() => fetchSongs(artist.id)} // Fetch songs for the selected artist
          >
            <img
              src={artist.image[2]?.url || "https://www.jiosaavn.com/_i/3.0/artist-default-music.png"}
              alt={artist.name}
              className="w-32 h-32 rounded-full mb-2"
            />
            <h3 className="text-lg font-semibold">{artist.name}</h3>
            <a
              href={artist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-1"
            >
              View on JioSaavn
            </a>
          </div>
        ))}
      </div>

      {/* Show songs for the selected artist */}
      {songs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl mb-4">Songs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {songs.map((song) => (
              <div
                key={song.id}
                className="bg-white p-2 rounded-lg shadow-md cursor-pointer"
                onClick={() => playSong(song)}
              >
                <img
                  src={song.image[2]?.url || "https://www.jiosaavn.com/_i/3.0/artist-default-music.png"}
                  alt={song.name}
                  className="w-24 h-24 rounded mb-2"
                />
                <h4 className="text-md font-semibold">{song.name}</h4>
                <p className="text-sm text-gray-500">{song.primaryArtists}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Play component for audio */}
      {currentTrack && <Play song={currentTrack} />}
    </div>
  );
};

export default Artist;
