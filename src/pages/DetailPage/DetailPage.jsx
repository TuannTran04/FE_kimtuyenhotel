import React from "react";
import Slider from "react-slick";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import "./DetailPage.css";
import { SliderDetail } from "../../features/SliderDetail/SliderDetail";
import TabsDetail from "../../features/TabsDetail/TabsDetail";
import FormDetail from "../../features/FormDetail/FormDetail";
import RelatedRooms from "../../features/RelatedRooms/RelatedRooms";

const DetailPage = () => {
  const navigate = useNavigate();
  // get param id on path
  const { id, name } = useParams();
  // console.log(id, name);

  const location = useLocation();
  // console.log(location.state);

  const roomData = location.state && location.state.roomData;
  const listRooms = location.state && location.state.listRooms;
  // console.log(roomData);
  // Check if location state exists
  if (!roomData) {
    navigate("/page-not-found");
    return <div>Loading...</div>;
  }
  // console.log(location.state.roomData);

  return (
    <div className="detail_page">
      {/* <div>{id}</div> */}
      <div className="detail_top">
        <div className="detail_top_img"></div>
        <div className="detail_top_intro">
          <h2 className="detail_top_heading">{roomData.name}</h2>
          <p className="detail_top_para">Phòng nghỉ</p>
        </div>
      </div>

      <div className="detail_container">
        <div className="detail_item">
          <div className="detail_item_left">
            <SliderDetail roomData={roomData} />
          </div>

          <div className="detail_item_right">
            <FormDetail roomData={roomData} />
          </div>
        </div>

        <hr style={{ opacity: 0.4 }} />

        <TabsDetail roomData={roomData} />

        <hr style={{ opacity: 0.4 }} />

        <RelatedRooms />
      </div>
    </div>
  );
};

export default DetailPage;
