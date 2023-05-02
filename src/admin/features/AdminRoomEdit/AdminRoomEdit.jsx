import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomEdit, editRoom } from "../../services/adminService";
import "./AdminRoomEdit.css";

const AdminEditRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  // console.log(roomId);
  const [form, setFormValue] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    quantity: "",
    area: "",
    view_direction: "",
    bed_type: "",
    image: "",
    imageUrlTemp: "",
    avatar: "",
    img_slider: ["", "", "", "", ""],
  });
  console.log(form);

  const inputRefFile = useRef(null);
  const {
    name,
    description,
    price,
    discount,
    quantity,
    area,
    view_direction,
    bed_type,
    image,
    imageUrlTemp,
    avatar,
    img_slider,
  } = form;

  const handleChange = (e) => {
    // console.log([e.target]);
    const { name, value } = e.target;
    if (name === "image") {
      setFormValue((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    } else {
      setFormValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSliderImageChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "img_slider") {
      const images = [...form.img_slider];
      images[index] = value;
      setFormValue((prev) => ({ ...prev, [name]: images }));
    }
  };

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setFormValue((prevState) => ({
        ...prevState,
        imageUrlTemp: url,
      }));
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !price ||
      isNaN(quantity) ||
      Number(quantity) < 0 ||
      !area ||
      !view_direction ||
      !bed_type ||
      !avatar ||
      img_slider.length !== 5 ||
      img_slider.some((item) => item.trim() === "")
    ) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) {
          if (key === "image") {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      console.log(...formData.entries());
      console.log(formData);

      const response = await editRoom(formData, roomId);
      console.log(response);
      alert(response.message);
      inputRefFile.current.value = "";
      navigate("/admin/admin-room");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error || "EDIT error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRoomEdit(roomId);
        const newRes = {
          ...res.data,
          img_slider: JSON.parse(res.data.img_slider),
        };

        setFormValue((prevState) => ({
          ...prevState,
          ...newRes,
        }));
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [roomId]);

  console.log(process.env.REACT_APP_BACKEND_URL + `${avatar}`);

  return (
    <div className="adminEditRoom_page">
      <div className="adminEditRoom_header">
        <h2>Chỉnh sửa phòng</h2>
      </div>
      <div className="adminEditRoom_wrap_form">
        <div className="adminEditRoom_form">
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Tên phòng</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Chill out"
              value={name}
            />
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Giá</label>
            <input
              name="price"
              type="text"
              onChange={handleChange}
              placeholder="6320000"
              value={price}
            />
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Giảm giá</label>
            <input
              name="discount"
              type="text"
              onChange={handleChange}
              placeholder="10% hoặc 500000"
              value={discount}
            />
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Số lượng</label>
            <input
              name="quantity"
              type="text"
              onChange={handleChange}
              placeholder="0"
              value={quantity}
            />
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Diện tích</label>
            <input
              name="area"
              type="text"
              onChange={handleChange}
              placeholder="10m2"
              value={area}
            />
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Hướng nhìn</label>
            <input
              name="view_direction"
              type="text"
              onChange={handleChange}
              placeholder="hướng..."
              value={view_direction}
            />
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Loại giường</label>
            <input
              name="bed_type"
              type="text"
              onChange={handleChange}
              placeholder="twin"
              value={bed_type}
            />
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Mô tả</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
              placeholder="phòng hiện đại với các tiện nghi...."
              value={description}
            ></textarea>
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Ảnh đại diện</label>
            <input
              name="image"
              type="file"
              onChange={handleChange}
              placeholder=""
              ref={inputRefFile}
            />
            "Ảnh hiện tại:"
            {avatar && (
              <img
                style={{
                  width: "250px",
                  height: "200px",
                  objectFit: "cover",
                  display: "flex",
                  margin: "5px auto 0",
                }}
                // src={image ? imageUrlTemp : `http://localhost:9090${avatar}`}
                src={
                  image
                    ? imageUrlTemp
                    : process.env.REACT_APP_BACKEND_URL + `${avatar}`
                }
                alt={avatar}
              />
            )}
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
        </div>
        <div className="adminEditRoom_wrap_btn">
          <button className="adminEditRoom_btn" onClick={handleSubmitForm}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditRoom;
