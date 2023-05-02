import React, { useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingEdit, editBooking } from "../../services/adminService";
import "./AdminBookingEdit.css";

const AdminBookingEdit = () => {
  const admin_id = localStorage.getItem("info-admin")
    ? JSON.parse(localStorage.getItem("info-admin")).id
    : "";
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const { bookingId } = useParams();
  const [reload, setReload] = useState(true);
  // console.log(bookingId);
  const [rooms, setRooms] = useState([]);
  console.log(rooms);
  const [priceRoom, setPriceRoom] = useState([]);
  const [totalPriceRoom, setTotalPriceRoom] = useState();
  console.log(totalPriceRoom);

  const [form, setFormValue] = useState({
    room_id: "",
    new_room_id: "",
    room_name: "",
    guest_name: "",
    guest_phone: "",
    checkin_date: "",
    checkout_date: "",
    total_price: "",
    total_stay: "",
    guest_mess: "",
    admin_id,
  });
  console.log(form);

  const {
    room_id,
    new_room_id,
    room_name,
    guest_name,
    guest_phone,
    checkin_date,
    checkout_date,
    total_price,
    total_stay,
    guest_mess,
  } = form;

  const handleChange = (e) => {
    // console.log([e.target]);
    const { name, value } = e.target;
    if (name === "new_room_id") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      // console.log(selectedOption);
      const selectedRoomName = selectedOption.dataset.room;
      // console.log(selectedRoomName);

      setFormValue((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
        room_name: selectedRoomName,
      }));
    } else {
      setFormValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !room_id ||
      !room_name ||
      !guest_name ||
      !guest_phone ||
      !checkin_date ||
      !checkout_date ||
      !total_price
    ) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    if (moment(checkin_date).isSameOrAfter(moment(checkout_date))) {
      alert("Ngày nhận phòng phải trước ngày trả phòng");
      return;
    }
    if (moment(checkout_date).isSameOrBefore(moment(checkin_date))) {
      alert("Ngày trả phòng phải sau ngày nhận phòng");
      return;
    }

    try {
      const formData = {
        bookingId,
        room_id,
        new_room_id,
        room_name,
        guest_name,
        guest_phone,
        checkin_date,
        checkout_date,
        total_price,
        total_stay,
        guest_mess,
        admin_id,
      };
      console.log(formData);

      const response = await editBooking(formData, bookingId);
      console.log(response);
      alert(response.message);

      // reload lại page để nhận lại data mới từ csdl, rồi update lại data client
      setReload((prev) => !prev);
      // navigate("/admin/admin-booking");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error || "EDIT error");
    }
  };

  useEffect(() => {
    const selectedRoom = rooms.find((room) => {
      // console.log(room.id);
      // return parseInt(room.id) === parseInt(room_id);
      return (
        parseInt(room.id) === parseInt(new_room_id ? new_room_id : room_id)
      );
    });
    // console.log(selectedRoom);
    const selectedRoomPrice = selectedRoom ? parseFloat(selectedRoom.price) : 0;
    console.log(selectedRoomPrice);
    setPriceRoom(selectedRoomPrice);
  }, [room_id, new_room_id]);

  useEffect(() => {
    if (checkin_date && checkout_date) {
      const checkinDate = moment(checkin_date);
      const checkoutDate = moment(checkout_date);

      // console.log(checkoutDate);
      // Tính số ngày
      const stayDays = checkoutDate.diff(checkinDate, "days") + 1;
      let stayNights = stayDays - 1;
      if (checkoutDate.hour() >= 12) {
        stayNights--;
      }
      const totalStay = `${stayDays} ngày ${stayNights} đêm`;
      // console.log(stayDays);
      // Tính số tiền
      const stayMoney = stayDays * priceRoom;
      // console.log(stayMoney);
      const totalPriceVAT = stayMoney + (stayMoney * 10) / 100;
      // console.log(totalPrice);
      setFormValue((prevState) => ({
        ...prevState,
        total_stay: totalStay,
        total_price: totalPriceVAT,
      }));
      setTotalPriceRoom(totalPriceVAT);
    }
  }, [checkin_date, checkout_date, priceRoom]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminIdFromLocalStorage = localStorage.getItem("info-admin")
          ? JSON.parse(localStorage.getItem("info-admin")).id
          : "";
        const res = await getBookingEdit(bookingId);
        // console.log(res);
        const newRes = {
          ...res.data,
          checkin_date: moment(res.data.checkin_date).format("YYYY-MM-DD"),
          checkout_date: moment(res.data.checkout_date).format("YYYY-MM-DD"),
        };
        setFormValue((prevState) => ({
          ...prevState,
          ...newRes,
          admin_id: adminIdFromLocalStorage,
        }));
        setRooms(res.roomList);

        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [bookingId, reload]);

  return (
    <div className="adminEditBooking_page">
      <div className="adminEditBooking_header">
        <h2>
          Chỉnh sửa đơn đặt phòng:{" "}
          {priceRoom.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
          /ngày
        </h2>
      </div>
      <div className="adminEditBooking_wrap_form">
        <div className="adminEditBooking_form">
          <div className="adminEditBooking_form_fill">
            <label htmlFor="room">Tên phòng</label>
            <select
              id="room"
              name="new_room_id"
              value={new_room_id ? new_room_id : room_id}
              onChange={handleChange}
            >
              {/* <option value="">Select a room</option> */}
              {rooms.map((room) => {
                {
                  /* if (room.quantity > 0 && room.disabled === 0) */
                }
                return (
                  <option
                    key={room.id}
                    value={room.id}
                    data-room={room.name}
                    data-price={room.price}
                  >
                    {room.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="adminEditBooking_form_fill">
            <label htmlFor="">Tên khách</label>
            <input
              name="guest_name"
              type="text"
              onChange={handleChange}
              placeholder="son tung"
              value={guest_name}
            />
          </div>
          <div className="adminEditBooking_form_fill">
            <label htmlFor="">Số điện thoại</label>
            <input
              name="guest_phone"
              type="text"
              onChange={handleChange}
              placeholder="096..."
              value={guest_phone}
            />
          </div>
          <div className="adminEditBooking_form_fill">
            <label htmlFor="">Ngày nhận</label>
            <input
              name="checkin_date"
              type="date"
              value={moment(checkin_date).format("YYYY-MM-DD")}
              min={today}
              onChange={handleChange}
            />
          </div>
          <div className="adminEditBooking_form_fill">
            <label htmlFor="">Ngày trả</label>
            <input
              name="checkout_date"
              type="date"
              placeholder="..."
              value={moment(checkout_date).format("YYYY-MM-DD")}
              min={today}
              onChange={handleChange}
            />
          </div>
          <div className="adminEditBooking_form_fill">
            <label htmlFor="">Giá (VAT 10%)</label>
            <input
              name="total_price"
              type="text"
              onChange={handleChange}
              placeholder="3500000"
              readOnly
              // value={total_price}
              value={
                totalPriceRoom
                  ? parseFloat(totalPriceRoom).toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })
                  : parseFloat(total_price).toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })
              }
            />
          </div>
          <div className="adminEditBooking_form_fill">
            <label htmlFor="">Tin nhắn</label>
            <textarea
              name="guest_mess"
              id=""
              cols="30"
              rows="5"
              onChange={handleChange}
              placeholder="message...."
              value={guest_mess}
            ></textarea>
          </div>
        </div>
        <div className="adminEditBooking_wrap_btn">
          <button className="adminEditBooking_btn" onClick={handleSubmitForm}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingEdit;
