import clsx from "clsx";
import React, { Component, useEffect, useState } from "react";
import "./SliderIns.css";
import Slider from "react-slick";
import { getInfoHotelData } from "../../services/roomService";
// import styles from "./SliderSmall.module.css";

// const SliderIns = () => {
//   const arrIns = [
//     "room_ks_1.jpg",
//     "room_ks_2.jpg",
//     "room_ks_3.jpg",
//     "rooms_pic_1.png",
//     "rooms_pic_1.png",
//   ];

//   return (
//     <div className="ins_img">
//       {arrIns.map((item, i) => {
//         return (
//           <div className="ins_item">
//             <img src={`assets/${item}`} alt={`ins_img_${i + 1}`} />
//             <div className="ins_overlay">
//               <div className="ins_overlay_content">
//                 <a href="#">
//                   <i className="fa-brands fa-instagram"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
//};

const SliderIns = () => {
  const [hotelData, setHotelData] = useState({});
  const [sliderIns, setSliderIns] = useState([]);
  // console.log(sliderIns);
  // const arrIns = [
  //   "https://steamuserimages-a.akamaihd.net/ugc/941699520639318064/B30FDC786E112747191946B2E3C783731F810FA0/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=#000000&letterbox=false",
  //   "https://steamuserimages-a.akamaihd.net/ugc/1741223858273953590/B28F793E8708841DB5D9A76DB3A17077C01B29C7/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
  //   "https://steamuserimages-a.akamaihd.net/ugc/1688276024726642685/338AD437D9538E46D49C3FC8C9D2185A52317538/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
  //   "https://steamuserimages-a.akamaihd.net/ugc/1687145409420611112/7B585F0B614EDC28D45185A6675B1388BD857D6E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=#000000&letterbox=false",
  //   "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/549e9b77-4c90-4c7f-8d0e-772a4ba70576/d67owr1-cd997d1c-914d-4d43-9d5a-07a21fea331e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU0OWU5Yjc3LTRjOTAtNGM3Zi04ZDBlLTc3MmE0YmE3MDU3NlwvZDY3b3dyMS1jZDk5N2QxYy05MTRkLTRkNDMtOWQ1YS0wN2EyMWZlYTMzMWUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bMBcmtDmanbMG4ulMGCoDZkeWtmadgDA4RfVWP9j0C0",
  //   "https://i.pinimg.com/originals/03/2d/5a/032d5aeb40f1e792fedcafe881c23a1c.gif",
  //   "https://i.pinimg.com/originals/cc/6c/fc/cc6cfc591c0d780ed130b72aa12b9212.gif",
  //   "https://i.pinimg.com/originals/51/a3/ec/51a3ecf688d5fc706e041e2830b77bb7.gif",
  // ];

  const settings = {
    className: "slider_ins",
    // dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    swipeToSlide: true,
    // draggable: true,
  };

  useEffect(() => {
    const renderHotelData = async () => {
      try {
        const res = await getInfoHotelData();
        const newRes = {
          ...res.data,
          slider_ins: JSON.parse(res.data.slider_ins),
        };
        setHotelData(newRes);
        setSliderIns(JSON.parse(res.data.slider_ins));
      } catch (err) {
        console.log(err);
      }
    };
    renderHotelData();
  }, []);

  return (
    <div className="ins_container">
      <Slider {...settings}>
        {sliderIns.map((item, i) => {
          return (
            <div key={i} className="ins_item">
              {/* <img src={`assets/${item}`} alt={`ins_img_${i + 1}`} /> */}
              <img src={item} alt={`ins_img_${i + 1}`} />
              <div className="ins_overlay">
                <div className="ins_overlay_content">
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderIns;
