import React, { useEffect, useState } from "react";
import FormContact from "../../features/FormContact/FormContact";
import "./ContactPage.css";
import { getInfoHotelData } from "../../services/roomService";

const ContactPage = () => {
  const [hotelData, setHotelData] = useState({});
  // console.log(hotelData);
  // console.log(hotelData.src_ggmap);

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
    <div className="contact_page">
      <div className="contact_top">
        <div className="contact_top_img"></div>
        <div className="contact_top_intro">
          <h2 className="contact_top_heading">Liên hệ</h2>
          <p className="contact_top_para">
            Liên hệ với chúng tôi bất cứ khi nào bạn cần!!!!!
          </p>
        </div>
      </div>

      <div className="contact_bottom">
        <div className="contact_bottom_wrapper">
          <div className="contact_info">
            <div className="contact_info_content">
              <div className="contact_info_top">
                <h3>Thông tin liên lạc</h3>
                <span></span>
              </div>

              <div className="contact_info_bottom">
                <div className="contact_info_item">
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                  <h3>Địa chỉ</h3>
                  <p>{hotelData.address}</p>
                </div>
                <div className="contact_info_item">
                  <i className="fa-solid fa-phone"></i>
                  <h3>Hỗ trợ 24/7</h3>
                  <p>
                    {hotelData && hotelData.phone
                      ? hotelData.phone.replace(
                          /(\d{3})(\d{3})(\d{4})/,
                          "$1 $2 $3"
                        )
                      : ""}
                  </p>
                </div>
                <div className="contact_info_item">
                  <i className="fa-solid fa-envelope"></i>
                  <h3>Email chúng tôi</h3>
                  <p>{hotelData.email}</p>
                </div>
              </div>
            </div>
          </div>

          <FormContact />
        </div>

        <iframe
          title="Google Maps"
          src={
            hotelData && hotelData.src_ggmap
              ? hotelData.src_ggmap
              : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.35266908251!2d106.64444691462332!3d10.860758192264358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ec479346ef%3A0x8fec6164654e4497!2sHotel%20Kim%20Tuy%E1%BA%BFn!5e0!3m2!1svi!2s!4v1680787614682!5m2!1svi!2s"
          }
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          className="contact_ggmap"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
