import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AdminInfoHotelEdit.css";
import {
  editFAQ,
  editInfoHotelAdmin,
  getInfoHotelAdmin,
} from "../../services/adminService";

const AdminInfoHotelEdit = () => {
  const admin_id = localStorage.getItem("info-admin")
    ? JSON.parse(localStorage.getItem("info-admin")).id
    : "";
  const { hotelId } = useParams();
  console.log(hotelId);

  const [form, setFormValue] = useState({
    id: 0,
    name: "",
    description: "",
    address: "",
    email: "",
    phone: "",
    slider_home: ["c", "c", "c"],
    slider_ins: ["", "", "", "", ""],
    src_ggmap: "",
    admin_id,
  });
  console.log(form);

  const {
    id,
    name,
    description,
    address,
    email,
    phone,
    slider_home,
    slider_ins,
    src_ggmap,
  } = form;

  const handleChange = (e) => {
    // console.log([e.target]);
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSliderImageChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "slider_home" || name === "slider_ins") {
      const images =
        name === "slider_home" ? [...form.slider_home] : [...form.slider_ins];
      images[index] = value;
      setFormValue((prev) => ({ ...prev, [name]: images }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !address ||
      !email ||
      !phone ||
      slider_home.length !== 3 ||
      slider_home.some((item) => item.trim() === "") ||
      slider_ins.length !== 8 ||
      slider_ins.some((item) => item.trim() === "") ||
      !src_ggmap
    ) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    try {
      const formData = form;
      console.log(formData);

      const response = await editInfoHotelAdmin(formData, hotelId);
      console.log(response);
      alert(response.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error || "EDIT error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminIdFromLocalStorage = localStorage.getItem("info-admin")
          ? JSON.parse(localStorage.getItem("info-admin")).id
          : "";
        const res = await getInfoHotelAdmin(hotelId);
        console.log(res.data);
        if (res.data.length === 0) {
          throw new Error("khong co ks nay");
        } else {
          const newRes = {
            ...res.data[0],
            slider_home: JSON.parse(res.data[0].slider_home),
            slider_ins: JSON.parse(res.data[0].slider_ins),
          };
          setFormValue((prevState) => ({
            ...prevState,
            ...newRes,
            admin_id: adminIdFromLocalStorage,
          }));
        }
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [hotelId]);

  return (
    <div className="adminEditInfoHotel_page">
      <div className="adminEditInfoHotel_header">
        <h2>Chỉnh sửa thông tin khách sạn</h2>
      </div>

      <div className="adminEditInfoHotel_wrap_form">
        <div className="adminEditInfoHotel_form">
          <div className="adminEditInfoHotel_form_fill">
            <label htmlFor="">ID</label>
            <input
              type="text"
              name="id"
              onChange={handleChange}
              placeholder="1"
              value={id}
              readOnly
            />
          </div>
          <div className="adminEditInfoHotel_form_fill">
            <label htmlFor="">Tên</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
              placeholder="Kim Tuyen Hotel"
            />
          </div>
          <div className="adminEditInfoHotel_form_fill">
            <label htmlFor="">Địa chỉ</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={address}
              placeholder="40/1/12..."
            />
          </div>
          <div className="adminEditInfoHotel_form_fill">
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="kimtuyen@gmail.com"
            />
          </div>
          <div className="adminEditInfoHotel_form_fill">
            <label htmlFor="">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              value={phone}
              placeholder="096xxxxx"
            />
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Link google map {`(Src)`}</label>
            <textarea
              name="src_ggmap"
              cols="30"
              rows="2"
              onChange={handleChange}
              value={src_ggmap}
              placeholder="..."
            ></textarea>
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Mô tả</label>
            <textarea
              name="description"
              cols="30"
              rows="5"
              onChange={handleChange}
              value={description}
              placeholder="..."
            ></textarea>
          </div>
          <div className="adminAddRoom_form_fill">
            <label>Link slide hình ảnh trang chủ (x3)</label>
            <input
              type="text"
              name="slider_home"
              placeholder="Link..."
              value={slider_home[0] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 0);
              }}
            />
            <input
              type="text"
              name="slider_home"
              placeholder="Link..."
              value={slider_home[1] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 1);
              }}
            />
            <input
              type="text"
              name="slider_home"
              placeholder="Link..."
              value={slider_home[2] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 2);
              }}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label>Link hình ảnh Instagram (x8)</label>
            <input
              type="text"
              name="slider_ins"
              placeholder="Link..."
              value={slider_ins[0] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 0);
              }}
            />
            <input
              type="text"
              name="slider_ins"
              placeholder="Link..."
              value={slider_ins[1] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 1);
              }}
            />
            <input
              type="text"
              name="slider_ins"
              placeholder="Link..."
              value={slider_ins[2] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 2);
              }}
            />
            <input
              type="text"
              name="slider_ins"
              placeholder="Link..."
              value={slider_ins[3] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 3);
              }}
            />
            <input
              type="text"
              name="slider_ins"
              placeholder="Link..."
              value={slider_ins[4] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 4);
              }}
            />
            <input
              type="text"
              name="slider_ins"
              placeholder="Link..."
              value={slider_ins[5] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 5);
              }}
            />
            <input
              type="text"
              name="slider_ins"
              placeholder="Link..."
              value={slider_ins[6] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 6);
              }}
            />
            <input
              type="text"
              name="slider_ins"
              placeholder="Link..."
              value={slider_ins[7] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 7);
              }}
            />
          </div>
        </div>
        <div className="adminEditInfoHotel_wrap_btn">
          <button className="adminEditInfoHotel_btn" onClick={handleSubmitForm}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoHotelEdit;
