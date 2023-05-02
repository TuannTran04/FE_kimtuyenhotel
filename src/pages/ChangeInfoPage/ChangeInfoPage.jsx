import React, { useEffect, useState } from "react";
import "./ChangeInfoPage.css";
import { changeInfoUser, getUser } from "../../services/userService";

const ChangeInfoPage = () => {
  const user_id = localStorage.getItem("info-user")
    ? JSON.parse(localStorage.getItem("info-user")).id
    : "";
  // console.log(user_id);
  const [form, setFormValue] = useState({
    id: 0,
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  // console.log(form);

  const { id, name, email, address, phone } = form;

  const handleChange = (e) => {
    // console.log([e.target]);
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!name || !email || !address || !phone) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    try {
      const formData = form;
      // console.log(formData);

      const response = await changeInfoUser(formData, user_id);
      // console.log(response);
      alert(response.message);
    } catch (error) {
      // console.log(error);
      alert(error.response.data.error.err || "EDIT error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUser(user_id);
        // console.log(res);
        if (res.data.length === 0) {
          throw new Error("khong co user nay");
        } else {
          // setFormValue(...res.data);
          setFormValue((prevState) => ({
            ...prevState,
            ...res.data,
          }));
        }

        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user_id]);

  return (
    <div className="changeInfo_page">
      <div className="changeInfo_header">
        <h2>Thay đổi thông tin</h2>
      </div>

      <div className="changeInfo_wrap_form">
        <div className="changeInfo_form">
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Tên</label>
            <input
              name="name"
              onChange={handleChange}
              placeholder="..."
              value={name}
            ></input>
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Email</label>
            <input
              name="email"
              onChange={handleChange}
              placeholder="..."
              value={email}
            ></input>
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Địa chỉ</label>
            <input
              name="address"
              onChange={handleChange}
              placeholder="..."
              value={address}
            ></input>
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Số điện thoại</label>
            <input
              name="phone"
              onChange={handleChange}
              placeholder="..."
              value={phone}
            ></input>
          </div>
        </div>
        <div className="changeInfo_wrap_btn">
          <button className="changeInfo_btn" onClick={handleSubmitForm}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfoPage;
