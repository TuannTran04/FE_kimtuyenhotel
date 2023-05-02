import clsx from "clsx";
import React, { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLogin from "../AdminLogin/AdminLogin";
import { registerAdmin } from "../../services/adminService";
import { arrIconSoc, arrInputForm } from "./AdminRegisterConst";
import "./AdminRegister.css";

const AdminRegister = () => {
  const [form, setFormValue] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  console.log(form);

  const inputPasswordRef = useRef();
  // console.log(inputPasswordRef.current);
  const inputConfirmPasswordRef = useRef();
  // console.log(inputConfirmPasswordRef.current);

  // dung` de redirect va save data tu page nay sang page khac
  const navigate = useNavigate();

  const { password, name, confirmPassword } = form;

  // show err when err
  const [errMessage, setErrMessage] = useState("");

  // set value form when input change
  const handleChange = (e) => {
    // console.log([e.target]);
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // show pass when click icon eye
  const handleShowPassword = (e) => {
    const targetInput =
      e.target.offsetParent.previousElementSibling.previousElementSibling;
    console.log([
      e.target.offsetParent.previousElementSibling.previousElementSibling,
    ]);
    if (targetInput) {
      targetInput.type = targetInput.type === "password" ? "text" : "password";
    }
  };

  // post data from client to server and get respone data from server
  const handleSubmit = async (e) => {
    setErrMessage("");
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        setErrMessage("Passwords do not match");
        return;
      }
      console.log(form);
      const response = await registerAdmin(name, password, confirmPassword);
      console.log(response);

      if (response && response.errCode) {
        setErrMessage(response.message);
      } else {
        // logic when login success
        navigate("/admin/login", { state: { name, password } });
        alert("create success");
        // console.log("create success");
      }
    } catch (error) {
      console.log(error);
      setErrMessage(error.message || error.response.data.message);
    }
  };

  return (
    <div className="registerAdmin_page">
      <div className="registerAdmin_background"></div>

      <div className="registerAdmin_container">
        <div className="registerAdmin_item">
          <h2 className="registerAdmin_logo">
            <i className="bx bxl-xing"></i>Admin
          </h2>

          <div className="registerAdmin_text-item">
            <h2>
              Chào mừng! <br />
              <span>Khách sạn Kim Tuyến</span>
            </h2>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              repellendus?
            </p>

            <div className="registerAdmin_social-icon">
              {arrIconSoc.map((item, i) => (
                <a key={i} href="#">
                  <i className={item}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={clsx("registerAdmin-section")}>
          <div className="formAdminRegister-box registerAdmin">
            <form action="">
              <h2>Đăng ký</h2>

              {arrInputForm.map((item, i) => (
                <div key={i} className="inputAdminRegister-box">
                  <span className="registerAdmin_icon">
                    <i className={item.icon}></i>
                  </span>
                  <input
                    ref={
                      item.name === "password"
                        ? inputPasswordRef
                        : item.name === "confirmPassword"
                        ? inputConfirmPasswordRef
                        : null
                    }
                    type={item.type}
                    name={item.name}
                    value={form[item.name]}
                    required
                    onChange={handleChange}
                  />
                  <label className="registerAdmin_label">
                    {item.nameLabel}
                  </label>
                  {(item.name === "password" ||
                    item.name === "confirmPassword") && (
                    <span
                      className="registerAdmin_icon_show"
                      onClick={handleShowPassword}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </span>
                  )}
                </div>
              ))}

              <div style={{ textAlign: "center", color: "red" }}>
                {errMessage}
              </div>

              <button className="registerAdmin_btn" onClick={handleSubmit}>
                Đăng ký
              </button>

              <div className="createAdmin-account">
                <p>
                  Bạn đã có tài khoản?{" "}
                  <Link to="/admin/login" className="registerAdmin-link">
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
