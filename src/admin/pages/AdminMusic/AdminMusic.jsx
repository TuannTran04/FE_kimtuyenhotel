import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { songs, channel_Id } from "./AdminMusicConst";
import unidecode from "unidecode";
import "./AdminMusic.css";
import { Link } from "react-router-dom";
import { getListChannelId } from "../../services/adminService";

// const AdminZingMP3 = () => {
//   const [songId, setSongId] = useState(0);
//   const [path, setPath] = useState({});
//   const { src, title } = path;
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const handleChangeSong = (songId) => {
//       setPath((prev) => ({
//         ...prev,
//         ...songs[songId],
//       }));
//     };
//     handleChangeSong(songId);
//   }, [songId]);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="zing_page">
//       <iframe
//         width="800"
//         height="550"
//         src={src}
//         title={title}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         allowFullScreen
//       ></iframe>
//       <div className="zing_wrap_song">
//         <input
//           className="zing_search"
//           type="text"
//           placeholder="Search song"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//         {songs.map((song, index) => {
//           if (song.name.toLowerCase().includes(searchTerm.toLowerCase())) {
//             return (
//               <div key={index} className="zing_song_item">
//                 <button
//                   className={index === songId ? "active" : ""}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setSongId(index);
//                   }}
//                 >
//                   {song.name}
//                 </button>
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// };
// export default AdminZingMP3;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> YOUTUBE PLAYLIST <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// // AIzaSyDeJ0YrmIyB1hnb-208v2fCB_hd48Pfup4 // key của mình

// let CHANNEL_ID = "UC8EB7c0E_TS4tpTQwMtv6fw";
const API_KEY = "AIzaSyDeJ0YrmIyB1hnb-208v2fCB_hd48Pfup4";

const AdminMusic = () => {
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
      // const response = await fetch(
      //   `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
      // );

      const data = await response.json();
      //   console.log(data);
      const playlists = data.items;
      //   console.log(playlists);
      const playlistIds = playlists.map((playlist) => playlist.id);

      // const uploadId = playlists.map(
      //   (item) => item.contentDetails.relatedPlaylists.uploads
      // );
      // console.log(uploadId);

      const songList = await Promise.all(
        playlistIds.map(async (id) => {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=100&key=${API_KEY}`
          );
          // const response = await fetch(
          //   `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadId[0]}&maxResults=100&key=${API_KEY}`
          // );
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
    <div className="youtube_page">
      <h1>PLAYLIST MUSIC {singerName.toUpperCase()}</h1>
      <div className="youtube_top_page">
        <div className="youtube_wrap_search">
          <input
            className="youtube_search"
            name="search_singer"
            type="text"
            placeholder="Search singer"
            value={searchTerm.search_singer}
            onChange={handleSearch}
          />
          <Link to="/admin/admin-add-singer">Add Singer</Link>
        </div>
        <div className="youtube_wrap_singer">
          {listChannelId.map((item, index) => {
            if (
              unidecode(item.name.toLowerCase()).includes(
                unidecode(searchTerm.search_singer.toLowerCase())
              )
            ) {
              return (
                <button
                  className={`youtube_btn_singer ${
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

      <div className="youtube_bot_page">
        <div className="youtube_wrap_search">
          <input
            className="youtube_search"
            name="search_song"
            type="text"
            placeholder="Search song"
            value={searchTerm.search_song}
            onChange={handleSearch}
          />
        </div>
        <div className="youtube_content">
          <ul className="youtube_wrap_song">
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
                    className={`youtube_song_item ${
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

export default AdminMusic;

// const AdminZingMP3 = () => {
//   const [videos, setVideos] = useState([]);

//   const channelId = "UClyA28-01x4z60eWQ2kiNbA";
//   const YOUR_API_KEY = "AIzaSyDeJ0YrmIyB1hnb-208v2fCB_hd48Pfup4";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://www.googleapis.com/youtube/v3/search?key=${YOUR_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=100`
//         );
//         console.log(response);
//         setVideos(response.items);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, [channelId]);

//   return (
//     <div>
//       <h1>Video from channel</h1>
//       {videos.map((video) => (
//         <div key={video.id.videoId}>
//           <img
//             src={video.snippet.thumbnails.medium.url}
//             alt={video.snippet.title}
//           />
//           <h2>{video.snippet.title}</h2>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminZingMP3;
