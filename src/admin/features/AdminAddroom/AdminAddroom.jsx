import React, { useRef, useState } from "react";
import { addRoomAdmin } from "../../services/adminService";
import "./AdminAddroom.css";

const AdminAddroom = () => {
  const [form, setFormValue] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    area: "",
    view_direction: "",
    bed_type: "",
    image: "",
    img_slider: "",
  });
  // console.log(form);

  const {
    name,
    description,
    price,
    quantity,
    area,
    view_direction,
    bed_type,
    image,
    img_slider,
  } = form;
  // console.log(img_slider.length);

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
    if (name === "img_slider") {
      const images = [...form.img_slider];
      images[index] = value;
      setFormValue((prev) => ({ ...prev, [name]: images }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !area ||
      !view_direction ||
      !bed_type ||
      !image ||
      img_slider.length !== 5 ||
      img_slider.some((item) => item.trim() === "")
    ) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    try {
      const formData = form;

      // console.log(formData);

      const response = await addRoomAdmin(formData);
      console.log(response);
      alert(response.message);
      setFormValue((prev) => ({
        ...prev,
        name: "",
        description: "",
        price: "",
        quantity: "",
        area: "",
        view_direction: "",
        bed_type: "",
        image: "",
        img_slider: "",
      }));
    } catch (error) {
      console.log(error);
      alert(error.response.data.error || "ADD error");
    }
  };

  return (
    <div className="adminAddRoom_page">
      <div className="adminAddRoom_header">
        <h2>Thêm phòng</h2>
      </div>
      <div className="adminAddRoom_wrap_form">
        <div className="adminAddRoom_form">
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Tên phòng</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Chill out"
              value={form.name}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Giá</label>
            <input
              name="price"
              type="text"
              onChange={handleChange}
              placeholder="6320000"
              value={form.price}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Số lượng</label>
            <input
              name="quantity"
              type="text"
              onChange={handleChange}
              placeholder="0"
              value={form.quantity}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Diện tích</label>
            <input
              name="area"
              type="text"
              onChange={handleChange}
              placeholder="10m2"
              value={form.area}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Hướng nhìn</label>
            <input
              name="view_direction"
              type="text"
              onChange={handleChange}
              placeholder="hướng..."
              value={form.view_direction}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Loại giường</label>
            <input
              name="bed_type"
              type="text"
              onChange={handleChange}
              placeholder="twin"
              value={form.bed_type}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Ảnh đại diện</label>
            <input
              name="image"
              type="text"
              onChange={handleChange}
              placeholder="link ảnh"
              value={form.image}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label>Link slide ảnh chi tiết (x5)</label>

            <input
              type="text"
              name="img_slider"
              placeholder="Link..."
              value={img_slider[0] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 0);
              }}
            />
            <input
              type="text"
              name="img_slider"
              placeholder="Link..."
              value={img_slider[1] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 1);
              }}
            />
            <input
              type="text"
              name="img_slider"
              placeholder="Link..."
              value={img_slider[2] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 2);
              }}
            />
            <input
              type="text"
              name="img_slider"
              placeholder="Link..."
              value={img_slider[3] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 3);
              }}
            />
            <input
              type="text"
              name="img_slider"
              placeholder="Link..."
              value={img_slider[4] || ""}
              onChange={(e) => {
                e.preventDefault();
                handleSliderImageChange(e, 4);
              }}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Mô tả</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="5"
              onChange={handleChange}
              placeholder="phòng hiện đại với các tiện nghi...."
              value={form.description}
            ></textarea>
          </div>
        </div>
        <div className="adminAddRoom_wrap_btn">
          <button className="adminAddRoom_btn" onClick={handleSubmitForm}>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddroom;
