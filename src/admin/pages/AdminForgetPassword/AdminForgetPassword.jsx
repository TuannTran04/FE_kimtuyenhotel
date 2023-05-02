import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgetPasswordAdmin } from "../../services/adminService";
import { arrIconSoc, arrInputForm } from "./AdminForgetConst";
import "./AdminForgetPassword.css";

const AdminForgetPassword = () => {
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

  const { name, password, confirmPassword } = form;

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
      const response = await forgetPasswordAdmin(
        name,
        password,
        confirmPassword
      );
      console.log(response);

      if (response && response.errCode) {
        setErrMessage(response.message);
      } else {
        // logic when login success
        navigate("/admin/login", { state: { name, password } });
        alert("change pass success");
        console.log("change pass success");
      }
    } catch (error) {
      console.log(error);
      setErrMessage(error.message || error.response.data.message);
    }
  };

  return (
    <div className="adminForget_page">
      <div className="adminForget_background"></div>

      <div className="adminForget_container">
        <div className="adminForget_item">
          <h2 className="adminForget_logo">
            <i className="bx bxl-xing"></i>Admin
          </h2>

          <div className="adminForget_text-item">
            <h2>
              Chào mừng! <br />
              <span>Khách sạn Kim Tuyến</span>
            </h2>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              repellendus?
            </p>

            <div className="adminForget_social-icon">
              {arrIconSoc.map((item, i) => (
                <a key={i} href="#">
                  <i className={item}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="adminForget-section">
          <div className="form-box adminForget">
            <form action="">
              <h2>Quên mật khẩu</h2>

              {arrInputForm.map((item, i) => (
                <div key={i} className="input-box">
                  <span className="adminForget_icon">
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
                  <label className="adminForget_label">{item.nameLabel}</label>
                  {(item.name === "password" ||
                    item.name === "confirmPassword") && (
                    <span
                      className="adminForget_icon_show"
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

              <button className="adminForget_btn" onClick={handleSubmit}>
                Lưu
              </button>

              <div className="create-account">
                <p>
                  Bạn đã có tài khoản?{" "}
                  <Link to="/admin/login" className="adminForget-link">
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

export default AdminForgetPassword;
