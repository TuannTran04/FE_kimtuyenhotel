import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCuisine, getCuisinesAdmin } from "../../services/adminService";
import "./AdminCuisineEdit.css";

const AdminCuisineEdit = () => {
  const { cuisineId } = useParams();
  const [form, setFormValue] = useState({
    name: "",
    opening_time: "",
    closing_time: "",
    description: "",
    img_slider: ["", "", "", "", ""],
  });
  console.log(form);

  const { name, opening_time, closing_time, description, img_slider } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "opening_time" || name === "closing_time") {
      const timeFormatted =
        name === "opening_time"
          ? moment(value, "hh:mm:ss A").format("HH:mm:ss")
          : moment(value, "hh:mm:ss A").format("HH:mm:ss");
      setFormValue((prevState) => ({
        ...prevState,
        [name]: timeFormatted,
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !opening_time ||
      !closing_time ||
      img_slider.length !== 5 ||
      img_slider.some((item) => item.trim() === "")
    ) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    try {
      const formData = form;
      console.log(formData);

      const response = await editCuisine(formData, cuisineId);
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
        const res = await getCuisinesAdmin(null, null, cuisineId);
        console.log(res.data[0]);
        const newRes = {
          ...res.data[0],
          img_slider: JSON.parse(res.data[0].img_slider),
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
  }, [cuisineId]);

  return (
    <div className="adminAddCuisine_page">
      <div className="adminAddCuisine_header">
        <h2>Chỉnh sửa chủ đề ẩm thực</h2>
      </div>
      <div className="adminAddCuisine_wrap_form">
        <div className="adminAddCuisine_form">
          <div className="adminAddCuisine_form_fill">
            <label htmlFor="">Tên chủ đề</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Chill out"
              value={name}
            />
          </div>
          <div className="adminAddCuisine_form_fill">
            <label htmlFor="">Giờ mở cửa</label>
            <input
              name="opening_time"
              type="time"
              onChange={handleChange}
              placeholder="08:00:00"
              step="2"
              value={opening_time}
            />
          </div>
          <div className="adminAddCuisine_form_fill">
            <label htmlFor="">Giờ đóng cửa</label>
            <input
              name="closing_time"
              type="time"
              onChange={handleChange}
              placeholder="20:00:00"
              step="2"
              value={closing_time}
            />
          </div>
          <div className="adminAddCuisine_form_fill">
            <label htmlFor="">Mô tả</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="5"
              onChange={handleChange}
              placeholder="...."
              value={description}
            ></textarea>
          </div>
          <div className="adminAddCuisine_form_fill">
            <label>Link slide hình ảnh chủ đề (x5)</label>

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
        <div className="adminAddCuisine_wrap_btn">
          <button className="adminAddCuisine_btn" onClick={handleSubmitForm}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCuisineEdit;
