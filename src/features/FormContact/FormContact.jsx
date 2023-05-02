import React, { useState } from "react";
import { createContact } from "../../admin/services/adminService";
import "./FormContact.css";
import {} from "react-router-dom";

const FormContact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { name, email, phone, message } = form;

  const handleChange = (e) => {
    // console.log([e.target]);
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    // Regex kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    if (!isValidEmail(email)) {
      // Nếu email không đúng định dạng, hiển thị thông báo lỗi
      alert("Email không đúng định dạng");
      return;
    }

    try {
      const formData = form;
      console.log(formData);

      const response = await createContact(formData);
      console.log(response);
      alert(response.message);
      setForm({ name: "", email: "", phone: "", message: "" });
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="contact_wrap_form">
      <div className="contact_form">
        <h2>Liên lạc</h2>
        <div className="contact_fields">
          <div className="contact_field_item w50">
            <input
              type="text"
              name="name"
              placeholder="Tên của bạn"
              value={name}
              onChange={handleChange}
            />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="contact_field_item w50">
            <input
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={email}
              onChange={handleChange}
            />
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="contact_field_item w100">
            <input
              type="text"
              name="phone"
              placeholder="096xxxx"
              value={phone}
              onChange={handleChange}
            />
            <i className="fa-solid fa-phone"></i>
          </div>
          <div className="contact_field_item w100 no-pdr">
            <textarea
              name="message"
              cols="30"
              rows="5"
              placeholder="Lời nhắn của bạn"
              value={message}
              onChange={handleChange}
            ></textarea>
            <i className="fa-solid fa-message"></i>
          </div>

          <div className="contact_field_item contact_wrap_btn">
            <button onClick={handleSubmitForm}>Gửi tin nhắn ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContact;
