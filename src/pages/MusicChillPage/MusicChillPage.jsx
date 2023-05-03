import React, { useEffect, useState } from "react";
import unidecode from "unidecode";
import { Link } from "react-router-dom";
import { getListChannelId } from "../../services/userService";
import "./MusicChillPage.css";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> YOUTUBE PLAYLIST <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// // AIzaSyDeJ0YrmIyB1hnb-208v2fCB_hd48Pfup4 // key của mình

// let CHANNEL_ID = "UC8EB7c0E_TS4tpTQwMtv6fw";
const API_KEY = "AIzaSyDeJ0YrmIyB1hnb-208v2fCB_hd48Pfup4";

const MusicChillPage = () => {
  const [listChannelId, setListChannelId] = useState([]);
  //   console.log(listChannelId);
  const [channelId, setChannelId] = useState("UC8EB7c0E_TS4tpTQwMtv6fw");
  // console.log(channelId);
  const [singerName, setSingerName] = useState("");

  const [songs, setSongs] = useState([]);
  //   console.log(songs);

  const [videoSrc, setVideoSrc] = useState("");
  // console.log(videoSrc);

  const [activeIndexSong, setActiveIndexSong] = useState(-1);
  const [activeIndexSinger, setActiveIndexSinger] = useState(-1);

  const [searchTerm, setSearchTerm] = useState({
    search_singer: "",
    search_song: "",
  });
  // console.log(searchTerm);

  const handleChangeSinger = (newChannelId, singerName, index) => {
    setChannelId(newChannelId);
    setSingerName(singerName);
    setActiveIndexSinger(index);
    setActiveIndexSong(-1);
  };

  const handleChangeKey = (src, index) => {
    const url = src;
    const videoSrc = url.split("?v=")[1];
    console.log(videoSrc); // M7UlJ0m-yy4
    setVideoSrc(videoSrc);
    setActiveIndexSong(index);
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=100&key=${API_KEY}`
      );

      const data = await response.json();
      //   console.log(data);
      const playlists = data.items;
      //   console.log(playlists);
      const playlistIds = playlists.map((playlist) => playlist.id);

      const songList = await Promise.all(
        playlistIds.map(async (id) => {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=100&key=${API_KEY}`
          );

          const data = await response.json();
          const songs = data.items.map((item) => {
            const { title, resourceId, thumbnails } = item.snippet;
            return {
              name: title,
              src: `https://www.youtube.com/watch?v=${resourceId.videoId}`,
              thumbnail: thumbnails.medium && thumbnails.medium.url,
            };
          });
          return songs;
        })
      );
      const flatList = songList.flat();
      setSongs(flatList);
    };
    fetchSongs();
  }, [channelId]);

  useEffect(() => {
    const renderChannel = async () => {
      try {
        const res = await getListChannelId();
        setListChannelId(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    renderChannel();
  }, []);

  return (
    <div className="musicChillPage_page">
      <i>Muốn add thêm singer thì ib admin</i>
      <h1>PLAYLIST MUSIC {singerName.toUpperCase()}</h1>
      <div className="musicChillPage_top_page">
        <div className="musicChillPage_wrap_search">
          <input
            className="musicChillPage_search"
            name="search_singer"
            type="text"
            placeholder="Search singer"
            value={searchTerm.search_singer}
            onChange={handleSearch}
          />
        </div>
        <div className="musicChillPage_wrap_singer">
          {listChannelId.map((item, index) => {
            if (
              unidecode(item.name.toLowerCase()).includes(
                unidecode(searchTerm.search_singer.toLowerCase())
              )
            ) {
              return (
                <button
                  className={`musicChillPage_btn_singer ${
                    index === activeIndexSinger ? "active" : ""
                  }`}
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeSinger(item.channel_id, item.name, index);
                  }}
                >
                  {item.name}
                </button>
              );
            }
          })}
        </div>
      </div>

      <div className="musicChillPage_bot_page">
        <div className="musicChillPage_wrap_search">
          <input
            className="musicChillPage_search"
            name="search_song"
            type="text"
            placeholder="Search song"
            value={searchTerm.search_song}
            onChange={handleSearch}
          />
        </div>
        <div className="musicChillPage_content">
          <ul className="musicChillPage_wrap_song">
            {songs.map((song, index) => {
              if (
                unidecode(song.name.toLowerCase()).includes(
                  unidecode(searchTerm.search_song.toLowerCase())
                ) &&
                song.name !== "Private video"
              ) {
                return (
                  <li
                    key={index}
                    className={`musicChillPage_song_item ${
                      index === activeIndexSong ? "active" : ""
                    }`}
                    onClick={() => handleChangeKey(song.src, index)}
                  >
                    <a href="#">{song.name}</a>
                    <img src={song.thumbnail} alt={song.thumbnail} />
                  </li>
                );
              }
            })}
          </ul>

          <iframe
            width="600"
            height="350"
            src={`https://www.youtube.com/embed/${videoSrc}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default MusicChillPage;
