import React, { useEffect, useState } from "react";
import "./Footer.css";
import { getInfoHotelData } from "../../../services/roomService";

const Footer = () => {
  const [hotelData, setHotelData] = useState({});

  useEffect(() => {
    const renderHotelData = async () => {
      try {
        const res = await getInfoHotelData();
        const newRes = {
          ...res.data,
        };
        setHotelData(newRes);
      } catch (err) {
        console.log(err);
      }
    };
    renderHotelData();
  }, []);

  return (
    <div className="footer">
      <div className="footer_top">
        <h2 className="footer_top_h2">Liên hệ với chúng tôi</h2>
      </div>
      <div className="footer_bottom">
        <div className="footer_bottom_item">
          <h2>{hotelData.name}</h2>
          <p>Địa chỉ: {hotelData.address}</p>
          <p>
            Số điện thoại:{" "}
            <span>
              {hotelData && hotelData.phone
                ? hotelData.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")
                : ""}
            </span>
          </p>
        </div>

        <div className="footer_bottom_item">
          <h2>Hỗ trợ khách hàng</h2>
          <p>Hỗ trợ 24/7</p>
          <p>
            <i className="fa-solid fa-phone"></i>{" "}
            <span>
              {hotelData && hotelData.phone
                ? hotelData.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")
                : ""}
            </span>
          </p>
        </div>

        <div className="footer_bottom_item">
          <p className="footer_bottom_psoc">
            Liên kết mạng xã hội của chúng tôi
          </p>
          <ul className="footer_bottom_socials">
            <li>
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer_copyright">
        <p>
          Copyright ©2023 All rights reserved | This template is made with{" "}
          <i className="fa-solid fa-heart"></i> by
          <span> Tuan Tran</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
