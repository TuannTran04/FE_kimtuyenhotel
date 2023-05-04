import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./RelatedRooms.css";
// import required modules
import { Autoplay, FreeMode } from "swiper";
import { getRoomsRelated } from "../../services/roomService";
import { Link, useParams } from "react-router-dom";

const RelatedRooms = () => {
  const { id, name } = useParams();
  // console.log(id);

  const [relatedRooms, setRelatedRooms] = useState([]);
  console.log(relatedRooms);

  useEffect(() => {
    const renderRelatedRooms = async () => {
      try {
        const res = await getRoomsRelated(id);

        setRelatedRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    renderRelatedRooms();
  }, [id, name]);

  return (
    <div className="related_rooms">
      <h2>Các phòng khác</h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        // loop={true}
        grabCursor={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="related_rooms_swiper"
      >
        {relatedRooms.map((room, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="related_room_item">
                <div className="related_room_header">
                  <img
                    // src={`http://localhost:9090${room.avatar}`}
                    src={room.avatar_2}
                    alt={room.avatar_2}
                  />
                </div>

                <div className="related_room_detail">
                  <h4 className="related_room_title">
                    <Link
                      to={`/detail-page/${room.name.replace(/\s+/g, "-")}/${
                        room.id
                      }`}
                      state={{ roomData: room }}
                    >
                      {room.name}
                    </Link>
                  </h4>

                  <ul className="related_room_info">
                    <li>{room.area}</li>
                    <li></li>
                    <li>{room.quantity} phòng còn lại</li>
                  </ul>

                  <div className="related_room_description">
                    <p>{room.description}</p>
                  </div>

                  <div className="related_room_footer">
                    <div className="related_room_price">
                      <span>
                        {parseFloat(room.price).toLocaleString("en-US", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                        / NGÀY
                      </span>
                    </div>
                    <Link
                      to={`/detail-page/${room.name.replace(/\s+/g, "-")}/${
                        room.id
                      }`}
                      state={{ roomData: room }}
                      className="related_room_btn"
                    >
                      <span>Chi tiết</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* <SwiperSlide>
          <div className="related_room_item">
            <div className="related_room_header">
              <img
                src="https://mirahotel.webhotel.vn/files/images/room/balcony-triple-suite/3.jpg"
                alt=""
              />
            </div>

            <div className="related_room_detail">
              <h4 className="related_room_title">
                <Link
                //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                >
                  Room name
                </Link>
              </h4>

              <ul className="related_room_info">
                <li>30m2</li>
                <li></li>
                <li>4 phòng còn lại</li>
              </ul>

              <div className="related_room_description">
                <p>
                  The ultimate comfort of 16 Senior De. The city view is rooted
                  in the minimalism and sophistication of Neoclassical Style
                  design and decoration.
                </p>
              </div>

              <div className="related_room_footer">
                <div className="related_room_price">
                  <span>7000đ/1 đêm</span>
                </div>
                <Link
                  //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                  className="related_room_btn"
                >
                  <span>Detail</span>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="related_room_item">
            <div className="related_room_header">
              <img
                src="https://mirahotel.webhotel.vn/files/images/room/balcony-triple-suite/3.jpg"
                alt=""
              />
            </div>

            <div className="related_room_detail">
              <h4 className="related_room_title">
                <Link
                //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                >
                  Room name
                </Link>
              </h4>

              <ul className="related_room_info">
                <li>30m2</li>
                <li></li>
                <li>4 phòng còn lại</li>
              </ul>

              <div className="related_room_description">
                <p>
                  The ultimate comfort of 16 Senior De. The city view is rooted
                  in the minimalism and sophistication of Neoclassical Style
                  design and decoration.
                </p>
              </div>

              <div className="related_room_footer">
                <div className="related_room_price">
                  <span>7000đ/1 đêm</span>
                </div>
                <Link
                  //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                  className="related_room_btn"
                >
                  <span>Detail</span>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="related_room_item">
            <div className="related_room_header">
              <img
                src="https://mirahotel.webhotel.vn/files/images/room/balcony-triple-suite/3.jpg"
                alt=""
              />
            </div>

            <div className="related_room_detail">
              <h4 className="related_room_title">
                <Link
                //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                >
                  Room name
                </Link>
              </h4>

              <ul className="related_room_info">
                <li>30m2</li>
                <li></li>
                <li>4 phòng còn lại</li>
              </ul>

              <div className="related_room_description">
                <p>
                  The ultimate comfort of 16 Senior De. The city view is rooted
                  in the minimalism and sophistication of Neoclassical Style
                  design and decoration.
                </p>
              </div>

              <div className="related_room_footer">
                <div className="related_room_price">
                  <span>7000đ/1 đêm</span>
                </div>
                <Link
                  //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                  className="related_room_btn"
                >
                  <span>Detail</span>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="related_room_item">
            <div className="related_room_header">
              <img
                src="https://mirahotel.webhotel.vn/files/images/room/balcony-triple-suite/3.jpg"
                alt=""
              />
            </div>

            <div className="related_room_detail">
              <h4 className="related_room_title">
                <Link
                //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                >
                  Room name
                </Link>
              </h4>

              <ul className="related_room_info">
                <li>30m2</li>
                <li></li>
                <li>4 phòng còn lại</li>
              </ul>

              <div className="related_room_description">
                <p>
                  The ultimate comfort of 16 Senior De. The city view is rooted
                  in the minimalism and sophistication of Neoclassical Style
                  design and decoration.
                </p>
              </div>

              <div className="related_room_footer">
                <div className="related_room_price">
                  <span>7000đ/1 đêm</span>
                </div>
                <Link
                  //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                  className="related_room_btn"
                >
                  <span>Detail</span>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="related_room_item">
            <div className="related_room_header">
              <img
                src="https://mirahotel.webhotel.vn/files/images/room/balcony-triple-suite/3.jpg"
                alt=""
              />
            </div>

            <div className="related_room_detail">
              <h4 className="related_room_title">
                <Link
                //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                >
                  Room name
                </Link>
              </h4>

              <ul className="related_room_info">
                <li>30m2</li>
                <li></li>
                <li>4 phòng còn lại</li>
              </ul>

              <div className="related_room_description">
                <p>
                  The ultimate comfort of 16 Senior De. The city view is rooted
                  in the minimalism and sophistication of Neoclassical Style
                  design and decoration.
                </p>
              </div>

              <div className="related_room_footer">
                <div className="related_room_price">
                  <span>7000đ/1 đêm</span>
                </div>
                <Link
                  //   to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${item.id}`}
                  className="related_room_btn"
                >
                  <span>Detail</span>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default RelatedRooms;
