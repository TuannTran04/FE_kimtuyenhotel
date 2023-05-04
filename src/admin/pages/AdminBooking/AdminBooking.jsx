import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminPagination from "../../features/AdminPagination/AdminPagination";
import {
  getBookingsAdmin,
  searchBookingsAdmin,
  deleteBooking,
  changeStatusBooking,
} from "../../services/adminService";
import "./AdminBooking.css";

const PAGE_SIZE = 5;

const AdminBooking = () => {
  const admin_id = localStorage.getItem("info-admin")
    ? JSON.parse(localStorage.getItem("info-admin")).id
    : "";
  console.log(admin_id);
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
    status: 0,
    filter: "",
  });
  console.log(form);
  const { status, filter } = form;
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

  const handleChangeStatus = async (bookingId, roomId, e) => {
    try {
      // console.log([e.target]);
      const { name, value } = e.target;
      console.log(name, value);
      console.log(bookingId);
      const formData = { status: value, roomId };
      const res = await changeStatusBooking(bookingId, formData);
      console.log(res);

      setFormValue((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      alert(res.message);
    } catch (error) {
      console.log(error || "change error");
    }
  };
  const handleConfirmChangeStatus = (bookingId, roomId, e) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn cập nhật trạng thái không? (không thể hoàn tác)"
      )
    ) {
      handleChangeStatus(bookingId, roomId, e);
    }
  };
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

  const handleDeleteBooking = async (bookingId, roomName, roomId) => {
    try {
      console.log(bookingId);
      const res = await deleteBooking(bookingId, roomName, roomId, admin_id);
      console.log(res);
      setBookings((prevBookings) =>
        prevBookings.filter((room) => room.id !== bookingId)
      );
    } catch (err) {
      console.log(err);
      alert(err.response.data.error || "DELETE error");
    }
  };
  const handleConfirmDelete = (bookingId, roomName, roomId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn này không?")) {
      handleDeleteBooking(bookingId, roomName, roomId);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const renderBookings = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const res = await searchBookingsAdmin(searchQuery, filter);
          console.log(res);
          setBookings(res.data);
        } else {
          const res = await getBookingsAdmin(currentPage, PAGE_SIZE, filter);
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
    <div className="adminBooking_page">
      <div className="adminBooking_header">
        <h2>Quản lý đơn đặt phòng</h2>
      </div>

      <form className="adminBooking_tools">
        <label>
          Tìm kiếm:
          <input
            className="adminBooking_tools_search"
            type="text"
            placeholder="Tên khách"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </label>

        <label>
          Bộ lọc trạng thái:
          <select
            className="adminBooking_tools_filter"
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

      <div className="adminBooking_wrap_list">
        <div className="adminBooking_list">
          <table className="adminBooking_table">
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
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, id) => {
                return (
                  <tr key={booking.id}>
                    <td style={{ minWidth: "50px" }}>{booking.id}</td>
                    <td style={{ minWidth: "150px" }}>{booking.room_name}</td>
                    <td style={{ minWidth: "300px" }}>{booking.guest_name}</td>
                    <td style={{ minWidth: "250px" }}>{booking.guest_email}</td>
                    <td style={{ minWidth: "150px" }}>{booking.guest_phone}</td>
                    <td
                      style={{
                        minWidth: "200px",
                      }}
                    >
                      {moment(booking.checkin_date).format("DD-MM-YYYY")}
                    </td>
                    <td
                      style={{
                        minWidth: "200px",
                      }}
                    >
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
                    <td
                      style={{ minWidth: "300px" }}
                      className="adminBooking_action"
                    >
                      <form action="">
                        <select
                          id="room"
                          name="status"
                          value="default"
                          onChange={(e) => {
                            e.preventDefault();
                            return handleConfirmChangeStatus(
                              booking.id,
                              booking.room_id,
                              e
                            );
                          }}
                        >
                          <option disabled value="default">
                            Trạng thái
                          </option>
                          <option value={0} disabled>
                            Tiếp nhận
                          </option>
                          <option value={1}>Đã xác nhận</option>
                          <option value={2}>Đã thanh toán</option>
                          <option value={3}>Đã trả phòng</option>
                          <option value={4}>Đã hủy</option>
                        </select>
                      </form>

                      <form action="">
                        <button
                          className="adminBooking_action-edit"
                          onClick={(e) => {
                            e.preventDefault();
                            if (parseInt(booking.status) === 0) {
                              navigate(
                                `/admin/admin-edit-booking/${booking.id}`
                              );
                            } else {
                              alert("Không thể chỉnh sửa");
                            }
                          }}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </form>

                      <form action="">
                        <button
                          className="adminBooking_action-delete"
                          onClick={(e) => {
                            e.preventDefault();
                            return handleConfirmDelete(
                              booking.id,
                              booking.room_name,
                              booking.room_id
                            );
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <AdminPagination
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

export default AdminBooking;
