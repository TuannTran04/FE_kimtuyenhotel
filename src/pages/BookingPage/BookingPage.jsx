import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "./BookingPage.css";
import FormBooking from "../../features/FormBooking/FormBooking";
import PageNotFound from "../NotFoundPage/NotFoundPage";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);
  console.log(Boolean(location.state));
  // console.log(roomData);
  // Check if location state exists

  if (!location.state) {
    return (
      <div>
        <PageNotFound />
      </div>
    );
  }

  const {
    roomId,
    nameRoom,
    checkin,
    checkout,
    children,
    adults,
    stayDays,
    stayNights,
    stayMoney,
  } = location.state;

  const VAT = (stayMoney * 10) / 100;

  return (
    <div className="booking_page">
      <div className="booking_top">
        <div className="booking_top_img"></div>
        <div className="booking_top_intro">
          <h2 className="booking_top_heading">{nameRoom}</h2>
          <p className="booking_top_para">Phòng nghỉ</p>
        </div>
      </div>

      <div className="booking_bottom">
        <div className="booking_bottom_wrapper">
          <div className="booking_bottom_left">
            <div className="booking_detail">
              <h3>Chi tiết</h3>
              <div className="booking_detail_info">
                <div className="booking_detail_info-left">
                  <p>Nhận phòng</p>
                  <p>Trả phòng</p>
                  <p>Tổng ngày ở</p>
                  <p>Tổng phòng</p>
                  <p>Tổng khách</p>
                </div>
                <div className="booking_detail_info-right">
                  <p>{checkin}</p>
                  <p>{checkout}</p>
                  <p>
                    {stayDays} ngày {stayNights} đêm
                  </p>
                  <p>1</p>
                  <p>
                    {adults} người lớn{" "}
                    {children > 0 ? `${children} trẻ em` : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="booking_selected">
              <h3>Chọn phòng</h3>
              <div className="booking_seleted_name">
                <span>{nameRoom}</span>
                <p>
                  {adults} người lớn {children > 0 ? `${children} trẻ em` : ""}
                </p>
              </div>

              <div className="booking_selected_price">
                <div className="booking_selected_price-left">
                  <p>Giá phòng</p>
                  <p>VAT</p>
                  <p>Phí dịch vụ</p>
                </div>
                <div className="booking_selected_price-right">
                  <p>{stayMoney.toLocaleString("en-US")} VND</p>
                  <p>{VAT.toLocaleString("en-US")} VND</p>
                  <p>Free</p>
                </div>
              </div>

              <div className="booking_selected_total">
                <div className="booking_selected_total-left">
                  <p>Tổng cộng</p>
                </div>
                <div className="booking_selected_total-right">
                  <p>{(stayMoney + VAT).toLocaleString("en-US")} VND</p>
                </div>
              </div>
            </div>
          </div>

          <div className="booking_bottom_right">
            <FormBooking infoBooking={location.state} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
