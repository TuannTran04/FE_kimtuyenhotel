import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInfoHotelAdmin } from "../../services/adminService";
import "./AdminInfoHotel.css";

const AdminInfoHotel = () => {
  const [infoHotel, setInfoHotel] = useState([]);
  console.log(infoHotel);

  const navigate = useNavigate();

  useEffect(() => {
    const renderInfoHotel = async () => {
      try {
        const res = await getInfoHotelAdmin();
        setInfoHotel(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    renderInfoHotel();
  }, []);

  return (
    <div className="adminInfoHotel_page">
      <div className="adminInfoHotel_header">
        <h2>Quản lý thông tin khách sạn</h2>
      </div>

      <div className="adminInfoHotel_wrap_list">
        <div className="adminInfoHotel_list">
          <table className="adminInfoHotel_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Địa chỉ</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {infoHotel.map((hotel, id) => (
                <tr key={id}>
                  <td>{hotel.id}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.address}</td>
                  <td>{hotel.email}</td>
                  <td>{hotel.phone}</td>
                  <td style={{ maxWidth: "400px" }}>{hotel.description}</td>
                  <td className="adminInfoHotel_action">
                    <form action="">
                      <button
                        className="adminInfoHotel_action-edit"
                        onClick={(e) => {
                          navigate(`/admin/admin-edit-info-hotel/${hotel.id}`);
                        }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoHotel;
