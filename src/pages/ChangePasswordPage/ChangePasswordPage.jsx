import React, { useEffect, useState } from "react";
import "./ChangePasswordPage.css";
import { useOutletContext } from "react-router-dom";
import { changePasswordUser } from "../../services/userService";

const ChangePasswordPage = () => {
  const [isLoading, setIsLoading] = useOutletContext();
  // console.log("CHANGE PASSWORD PAGE", isLoading);

  const user_id = localStorage.getItem("info-user")
    ? JSON.parse(localStorage.getItem("info-user")).id
    : "";

  const [form, setFormValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  // console.log(form);

  const { oldPassword, newPassword, confirmNewPassword } = form;

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
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const formData = form;
      // console.log(formData);

      const response = await changePasswordUser(formData, user_id);
      // console.log(response);
      setIsLoading(false);
      alert(response.message);

      setFormValue((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      alert(error.response.data.err.err || "EDIT error");
    }
  };

  return (
    <div className="changePassword_page">
      <div className="changePassword_header">
        <h2>Thay đổi mật khẩu</h2>
      </div>

      <div className="changePassword_wrap_form">
        <div className="changePassword_form">
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Mật khẩu cũ</label>
            <input
              name="oldPassword"
              onChange={handleChange}
              placeholder="..."
              value={oldPassword}
            ></input>
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Mật khẩu mới</label>
            <input
              name="newPassword"
              onChange={handleChange}
              placeholder="..."
              value={newPassword}
            ></input>
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Xác nhận mật khẩu mới</label>
            <input
              name="confirmNewPassword"
              onChange={handleChange}
              placeholder="..."
              value={confirmNewPassword}
            ></input>
          </div>
        </div>
        <div className="changePassword_wrap_btn">
          <button className="changePassword_btn" onClick={handleSubmitForm}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
