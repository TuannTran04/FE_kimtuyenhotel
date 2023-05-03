import clsx from "clsx";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword, registerUser } from "../../services/userService";
import { arrIconSoc, arrInputForm } from "./ForgetPasswordConst";
import "./ForgetPasswordPage.css";
import Loading from "../../components/layout/Loading/Loading";

const ForgetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setFormValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // console.log(form);

  const inputPasswordRef = useRef();
  // console.log(inputPasswordRef.current);
  const inputConfirmPasswordRef = useRef();
  // console.log(inputConfirmPasswordRef.current);

  // dung` de redirect va save data tu page nay sang page khac
  const navigate = useNavigate();

  const { email, password, confirmPassword } = form;

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
      setIsLoading(true);
      // console.log(form);
      const response = await forgetPassword(email, password, confirmPassword);
      // console.log(response);

      if (response && response.errCode) {
        setIsLoading(false);
        setErrMessage(response.message);
      } else {
        setIsLoading(false);
        // logic when login success
        navigate("/login", { state: { email, password } });
        alert("change pass success");
        // console.log("change pass success");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrMessage(error.message || error.response.data.message);
    }
  };

  return (
    <div className="forget_page">
      {isLoading ? <Loading fullScreen /> : ""}
      <div className="forget_background"></div>

      <div className="forget_container">
        <div className="forget_item">
          <h2 className="forget_logo">
            <i className="bx bxl-xing"></i>TUAN TRAN
          </h2>

          <div className="forget_text-item">
            <h2>
              Chào mừng! <br />
              <span>Khách sạn Kim Tuyến</span>
            </h2>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              repellendus?
            </p>

            <div className="forget_social-icon">
              {arrIconSoc.map((item, i) => (
                <a key={i} href="#">
                  <i className={item}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={clsx("forget-section")}>
          <div className="form-box forget">
            <form action="">
              <h2>Quên mật khẩu</h2>

              {arrInputForm.map((item, i) => (
                <div key={i} className="input-box">
                  <span className="forget_icon">
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
                  <label className="forget_label">{item.nameLabel}</label>
                  {(item.name === "password" ||
                    item.name === "confirmPassword") && (
                    <span
                      className="forget_icon_show"
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

              <button className="forget_btn" onClick={handleSubmit}>
                Lưu
              </button>

              <div className="create-account">
                <p>
                  Bạn đã có tài khoản?{" "}
                  <Link to="/login" className="forget-link">
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
export default ForgetPasswordPage;
