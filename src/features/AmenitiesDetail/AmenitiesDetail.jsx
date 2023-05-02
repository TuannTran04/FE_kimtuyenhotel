import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./AmenitiesDetail.css";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper";

const AmenitiesDetail = () => {
  const arrAmenities = [
    { id: 1, icon: "fa-solid fa-wifi", amenity: "Free wifi" },
    { id: 2, icon: "fa-solid fa-tv", amenity: "TV in room" },
    {
      id: 3,
      icon: "fa-solid fa-temperature-low",
      amenity: "Refrigerator",
    },
    { id: 4, icon: "fa-solid fa-mug-saucer", amenity: "Breakfast" },
    { id: 5, icon: "fa-solid fa-phone", amenity: "Phone" },
    { id: 6, icon: "fa-solid fa-martini-glass", amenity: "Mini bar" },
    {
      id: 7,
      icon: "fas fa-fan",
      amenity: "Air conditioning",
    },
    { id: 8, icon: "fa-solid fa-bath", amenity: "Bathtub" },
  ];

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        //
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        //
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="amenities_detail"
      >
        {arrAmenities.map((item, index) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="amenities_item">
                <div className="amenities_content">
                  <i className={item.icon}></i>
                  <span>{item.amenity}</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* <SwiperSlide>
          <div className="amenities_item">
            <div className="amenities_content">
              <i className="fa-solid fa-wifi"></i>
              <span>Free wifi</span>
            </div>
          </div>
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
};

export default AmenitiesDetail;
