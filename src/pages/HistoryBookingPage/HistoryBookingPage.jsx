import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AccountPagination from "../../components/layout/AccountPagination/AccountPagination";
import {
  getBookingsAccount,
  searchBookingsAccount,
} from "../../services/userService";
import "./HistoryBookingPage.css";

const PAGE_SIZE = 5;

const HistoryBookingPage = () => {
  const user_id = localStorage.getItem("info-user")
    ? JSON.parse(localStorage.getItem("info-user")).id
    : "";
  // console.log(user_id);
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page");
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  console.log(bookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  const [totalPages, setTotalPages] = useState(0);

  const newUrl = `${window.location.pathname}?page=${currentPage}`;
  window.history.pushState(null, null, newUrl);

  // form này chỉ để làm flag reload giao diện
  const [form, setFormValue] = useState({
    filter: "",
  });
  console.log(form);
  const { filter } = form;
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    if (value) {
      setFormValue((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
    } else {
      setFormValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const statusNames = [
    "Tiếp nhận",
    "Đã xác nhận",
    "Đã thanh toán",
    "Đã trả phòng",
    "Đã hủy",
  ];
  const styleStatusNames = [
    "adminBooking_disabled ",
    "adminBooking_active",
    "adminBooking_active",
    "adminBooking_edit",
    "adminBooking_cancel",
  ];

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const renderBookings = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const res = await searchBookingsAccount(searchQuery, user_id, filter);
          console.log(res);
          setBookings(res.data);
        } else {
          const res = await getBookingsAccount(
            currentPage,
            PAGE_SIZE,
            user_id,
            filter
          );
          // console.log(res.total);
          setBookings(res.data);
          setTotalPages(Math.ceil(res.total / PAGE_SIZE));
        }
      } catch (err) {
        console.log(err);
      }
    };
    renderBookings();
  }, [currentPage, searchQuery, form]);

  // thay đổi page trên url thì update lại data
  useEffect(() => {
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [searchParams]);

  return (
    <div className="historyBooking_page">
      <div className="historyBooking_header">
        <h2>Lịch sử đặt phòng</h2>
      </div>

      <form className="historyBooking_tools">
        <label>
          Tìm kiếm:
          <input
            className="historyBooking_tools_search"
            type="text"
            placeholder="Tên phòng"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </label>

        <label>
          Bộ lọc trạng thái:
          <select
            className="historyBooking_tools_filter"
            id="room"
            name="filter"
            value={filter}
            onChange={handleChangeFilter}
          >
            <option value="">Tất cả</option>
            <option value={0}>Tiếp nhận</option>
            <option value={1}>Đã xác nhận</option>
            <option value={2}>Đã thanh toán</option>
            <option value={3}>Đã trả phòng</option>
            <option value={4}>Đã hủy</option>
          </select>
        </label>
      </form>

      <div className="historyBooking_wrap_list">
        <div className="historyBooking_list">
          <table className="historyBooking_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên phòng</th>
                <th>Tên khách</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ngày nhận</th>
                <th>Ngày trả</th>
                <th>Tin nhắn</th>
                <th>Tổng ngày ở</th>
                <th>Tổng khách</th>
                <th>Tổng giá</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, id) => {
                return (
                  <tr key={booking.id}>
                    <td style={{ minWidth: "50px" }}>{booking.id}</td>
                    <td style={{ minWidth: "150px" }}>{booking.room_name}</td>
                    <td style={{ minWidth: "250px" }}>{booking.guest_name}</td>
                    <td style={{ minWidth: "250px" }}>{booking.guest_email}</td>
                    <td style={{ minWidth: "200px" }}>{booking.guest_phone}</td>
                    <td style={{ minWidth: "200px" }}>
                      {moment(booking.checkin_date).format("DD-MM-YYYY")}
                    </td>
                    <td style={{ minWidth: "200px" }}>
                      {moment(booking.checkout_date).format("DD-MM-YYYY")}
                    </td>
                    <td style={{ minWidth: "400px" }}>{booking.guest_mess}</td>
                    <td style={{ minWidth: "200px" }}>{booking.total_stay}</td>
                    <td style={{ minWidth: "200px" }}>
                      {booking.total_guests}
                    </td>
                    <td style={{ minWidth: "200px" }}>
                      {parseInt(booking.total_price).toLocaleString("en-US")}
                    </td>
                    <td style={{ minWidth: "200px" }}>
                      {/* 0 là tiếp nhận, 1 là đã xác nhận, 2 là đã thanh toán, 3 là đã trả phòng, 4 là đã hủy */}
                      <span
                        className={styleStatusNames[parseInt(booking.status)]}
                      >
                        {statusNames[parseInt(booking.status)]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <AccountPagination
          paginationData={{
            currentPage,
            totalPages,
            setCurrentPage: setCurrentPage,
          }}
        />
      </div>
    </div>
  );
};

export default HistoryBookingPage;
