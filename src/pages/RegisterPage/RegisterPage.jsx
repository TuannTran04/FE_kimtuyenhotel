import clsx from "clsx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import Header from "../../components/layout/Header/Header";
import LoginPage from "../LoginPage/LoginPage";
import { registerUser } from "../../services/userService";
import { arrIconSoc, arrInputForm } from "./RegisterConst";
import "./RegisterPage.css";
import Loading from "../../components/layout/Loading/Loading";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  // console.log(form);

  const inputPasswordRef = useRef();
  // console.log(inputPasswordRef.current);
  const inputConfirmPasswordRef = useRef();
  // console.log(inputConfirmPasswordRef.current);

  // dung` de redirect va save data tu page nay sang page khac
  const navigate = useNavigate();

  const { email, password, name, confirmPassword } = form;

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

  // Regex kiểm tra định dạng email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      if (!isValidEmail(email)) {
        // Nếu email không đúng định dạng, hiển thị thông báo lỗi
        setErrMessage("Email không đúng định dạng");
        return;
      }
      // console.log(form);
      setIsLoading(true);
      const response = await registerUser(
        email,
        password,
        name,
        confirmPassword
      );
      // console.log(response);

      if (response && response.errCode) {
        setIsLoading(false);
        setErrMessage(response.message);
      } else {
        // logic when login success
        setIsLoading(false);
        navigate("/login", { state: { email, password } });
        alert("create success");
        // console.log("create success");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrMessage(error.message || error.response.data.message);
    }
  };

  return (
    <div className="register_page">
      {isLoading ? <Loading fullScreen /> : ""}
      <div className="register_background"></div>

      <div className="register_container">
        <div className="register_item">
          <h2 className="register_logo">
            <i className="bx bxl-xing"></i>TUAN TRAN
          </h2>

          <div className="register_text-item">
            <h2>
              Chào mừng! <br />
              <span>khách sạn Kim Tuyến</span>
            </h2>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              repellendus?
            </p>

            <div className="register_social-icon">
              {arrIconSoc.map((item, i) => (
                <a key={i} href="#">
                  <i className={item}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={clsx("register-section")}>
          <div className="form-box register">
            <form action="">
              <h2>Đăng ký</h2>

              {arrInputForm.map((item, i) => (
                <div key={i} className="input-box">
                  <span className="register_icon">
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
                  <label className="register_label">{item.nameLabel}</label>
                  {(item.name === "password" ||
                    item.name === "confirmPassword") && (
                    <span
                      className="register_icon_show"
                      onClick={handleShowPassword}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </span>
                  )}
                </div>
              ))}

              {/* <div className="remember-password">
                <label htmlFor="">
                  <input type="checkbox" />I agree with this statment
                </label>
              </div> */}

              <div style={{ textAlign: "center", color: "red" }}>
                {errMessage}
              </div>

              <button className="register_btn" onClick={handleSubmit}>
                Đăng ký
              </button>

              <div className="create-account">
                <p>
                  Bạn đã có tài khoản?{" "}
                  <Link to="/login" className="register-link">
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

export default RegisterPage;
