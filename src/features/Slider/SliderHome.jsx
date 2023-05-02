import React, { useEffect, useState } from "react";
// import styles from "./Slider.module.css";
import "./SliderHome.css";
import clsx from "clsx";
import Slider from "react-slick";
import { getInfoHotelData } from "../../services/roomService";

// import { baseUrl } from "./config";

// export default class SliderHome extends React.Component {
//   state = {
//     slideIndex: 0,
//   };

//   render() {
//     let arrImg = [
//       { id: 1, imgLink: "/assets/room_ks_1.jpg" },
//       { id: 2, imgLink: "/assets/room_ks_1.jpg" },
//       { id: 2, imgLink: "/assets/room_ks_1.jpg" },
//     ];
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       autoplaySpeed: 2000,
//       afterChange: () =>
//         this.setState((state) => ({ updateCount: state.updateCount + 1 })),
//       beforeChange: (current, next) => this.setState({ slideIndex: next }),
//     };
//     return (
//       <div>
//         <Slider ref={(slider) => (this.slider = slider)} {...settings}>
//           {arrImg.map((img, i) => (
//             <div key={i}>
//               <img
//                 className={clsx(styles.item_img)}
//                 src={img.imgLink}
//                 alt={img.id}
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     );
//   }
// }
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }

// class SliderHome extends React.Component {
//   render() {
//     const arrSlider = ["slider_1.jpg", "room_ks_1.jpg", "room_ks_2.jpg"];
//     let settings = {
//       dots: true,
//       className: "slider_home ",
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 3000,
//       //   nextArrow: <SampleNextArrow />,
//       //   prevArrow: <SamplePrevArrow />,
//     };

//     return (
//       <Slider {...settings}>
//         {arrSlider.map((item, i) => (
//           <div key={i} className="slider_item">
//             <div className="wrap_slide_img">
//               <img className="item_img" src={`/assets/${item}`} />
//             </div>
//             {i === 0 && (
//               <div className="slider_intro">
//                 <h2>Kim Tuyến Hotel</h2>
//                 <p>Xin kính chào quý khách</p>
//               </div>
//             )}
//           </div>
//         ))}
//         {/* <div className="wrap_slide_img">
//           <img className="item_img" src="/assets/room_ks_1.jpg" />
//         </div>
//         <div className="wrap_slide_img">
//           <img className="item_img" src="/assets/room_ks_2.jpg" />
//         </div>
//         <div className="wrap_slide_img">
//           <img className="item_img" src="/assets/room_ks_3.jpg" />
//         </div> */}
//       </Slider>
//     );
//   }
// }

const SliderHome = () => {
  const [hotelData, setHotelData] = useState({});
  const [sliderHome, setSliderHome] = useState([]);
  // console.log(sliderHome);
  // console.log(hotelData);
  // const arrSlider = ["slider_1.jpg", "room_ks_1.jpg", "room_ks_2.jpg"];
  let settings = {
    dots: true,
    className: "slider_home ",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const renderHotelData = async () => {
      try {
        const res = await getInfoHotelData();
        const newRes = {
          ...res.data,
          slider_home: JSON.parse(res.data.slider_home),
        };
        setHotelData(newRes);
        setSliderHome(JSON.parse(res.data.slider_home));
      } catch (err) {
        console.log(err);
      }
    };
    renderHotelData();
  }, []);

  return (
    <Slider {...settings}>
      {sliderHome.map((item, i) => (
        <div key={i} className="slider_item">
          <div className="wrap_slide_img">
            <img className="item_img" src={item} />
          </div>
          {i === 0 && (
            <div className="slider_intro">
              <h2>{hotelData.name}</h2>
              <p>Xin kính chào quý khách</p>
            </div>
          )}
        </div>
      ))}
    </Slider>
  );
};

export default SliderHome;
