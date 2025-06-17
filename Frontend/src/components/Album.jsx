import React, { useState, useEffect } from "react";
import axios from "axios";

const Album = ({ searchQuery }) => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultAlbum = "Top Hits";

  useEffect(() => {
    const fetchAlbums = async () => {
      const query = searchQuery || defaultAlbum;
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          "https://saavn.dev/api/search/albums",
          {
            params: { query: query },
          }
        );
        setAlbums(data.data.results || []);
      } catch (err) {
        setError("Failed to fetch albums");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [searchQuery]);

  const fetchSongs = async (albumId) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://saavn.dev/api/albums/${albumId}`
      );
      setSongs(data.data.songs || []);
    } catch (err) {
      setError("Failed to fetch songs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Albums</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="bg-white p-2 rounded-lg shadow-md cursor-pointer"
            onClick={() => fetchSongs(album.id)}
          >
            <img
              src={
                album.image[2]?.url ||
                "https://www.jiosaavn.com/_i/3.0/album-default-music.png"
              }
              alt={album.name}
              className="w-32 h-32 rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{album.name}</h3>
            <p className="text-sm text-gray-500">
              {album.artists?.primary?.[0]?.name || "Unknown Artist"}
            </p>
          </div>
        ))}
      </div>
      {songs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl mb-4">Songs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {songs.map((song) => (
              <div key={song.id} className="bg-white p-2 rounded-lg shadow-md">
                <img
                  src={
                    song.image[2]?.url ||
                    "https://www.jiosaavn.com/_i/3.0/song-default-music.png"
                  }
                  alt={song.name}
                  className="w-24 h-24 rounded mb-2"
                />
                <h4 className="text-md font-semibold">{song.name}</h4>
                <p className="text-sm text-gray-500">
                  {song.artists?.primary?.[0]?.name || "Unknown Artist"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;
