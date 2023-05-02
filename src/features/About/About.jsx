import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";
import { getInfoHotelData } from "../../services/roomService";

const About = () => {
  const [hotelData, setHotelData] = useState({});
  const [description, setDesciption] = useState([]);

  useEffect(() => {
    const renderHotelData = async () => {
      try {
        const res = await getInfoHotelData();
        const newRes = {
          ...res.data,
        };
        setHotelData(newRes);
        setDesciption(res.data.description);
      } catch (err) {
        console.log(err);
      }
    };
    renderHotelData();
  }, []);

  return (
    <div className={styles.exceed_container}>
      <div className={styles.exceed_contain}>
        <div className={styles.exceed_content}>
          <div className={styles.exceed_left}>
            <h2>Bạn đã sẵn sàng để vượt quá mong đợi</h2>
            <p>{description}</p>
            <Link to="/rooms">Xem thêm</Link>
          </div>
        </div>
        <div className={styles.wrap_img}>
          <img
            className={styles.exceed_img}
            src="/assets/room_ks_3.jpg"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
