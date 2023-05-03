import React, { useEffect, useRef, useState } from "react";
import "./SliderDetail.css";
import Slider from "react-slick";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useParams } from "react-router-dom";
import { getRoomEdit } from "../../admin/services/adminService";

// class SliderDetail extends React.Component {
//   render() {
//     const settings = {
//       customPaging: function (i) {
//         return (
//           <a>
//             <img src={`/assets/room_ks_${i + 1}.jpg`} />
//           </a>
//         );
//       },
//       className: "slider_detail",
//       dots: true,
//       dotsClass: "slick-dots slick-thumb",
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//     };

//     return (
//       <div>
//         <Slider {...settings}>
//           <div className="slider_detail_item">
//             <img src="/assets/room_ks_1.jpg" />
//           </div>
//           <div className="slider_detail_item">
//             <img src="/assets/room_ks_2.jpg" />
//           </div>
//           <div className="slider_detail_item">
//             <img src="/assets/room_ks_3.jpg" />
//           </div>
//           <div className="slider_detail_item">
//             <img src="/assets/room_ks_4.jpg" />
//           </div>
//           <div className="slider_detail_item">
//             <img src="/assets/room_ks_5.jpg" />
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }

const SliderDetail = ({ roomData }) => {
  console.log(roomData);
  const img_slider = JSON.parse(roomData.img_slider);
  // console.log(img_slider);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={6}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          {/* <img src={`http://localhost:9090${roomData.avatar}`} /> */}
          <img src={roomData.avatar_2} alt="pic" />
        </SwiperSlide>
        {img_slider.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={img} alt={i} />
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide> */}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={6}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          {/* <img src={`http://localhost:9090${roomData.avatar}`} /> */}
          <img src={roomData.avatar_2} alt={roomData.avatar_2} />
        </SwiperSlide>
        {img_slider.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={img} alt={i} />
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export { SliderDetail };
