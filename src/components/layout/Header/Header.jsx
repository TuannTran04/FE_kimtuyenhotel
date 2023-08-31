import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import {
  Routes,
  Route,
  Link,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Logout from "../Logout/Logout";
import { useSelector } from "react-redux";

// console.log(styles);

const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const nav = useNavigate();
  const [hideNavInfo, setHideNavInfo] = useState(false);

  const handleNavAccountPage = () => {
    nav("/account-page");
  };

  useEffect(() => {
    const handleShowNav = () => {
      if (window.scrollY > 200 && window.scrollY < 600) {
        setHideNavInfo(true);
      } else {
        setHideNavInfo(false);
      }
    };
    window.addEventListener("scroll", handleShowNav);

    return () => {
      window.removeEventListener("scroll", handleShowNav);
    };
  });

  return (
    <div
      className={clsx(styles.nav_header, {
        [styles.hide]: hideNavInfo,
      })}
    >
      <div className={clsx(styles.nav_contain)}>
        <div className={clsx(styles.nav_logo)}>
          <Link to="/">
            <img src="/favicon.ico" alt="logo" />
          </Link>
        </div>

        <div className={clsx(styles.nav_menu)}>
          <div
            className={clsx(styles.nav_info, {
              [styles.hide]: hideNavInfo,
            })}
          >
            <ul>
              <li>
                <NavLink to="/">Trang chủ</NavLink>
              </li>
              <li>
                <NavLink to="/product-page">Phòng</NavLink>
              </li>
              <li>
                <NavLink to="/cuisine-page">Ẩm thực</NavLink>
              </li>
              <li>
                <NavLink to="/service-page">Dịch vụ</NavLink>
              </li>
              <li>
                <NavLink to="/contact-page">Liên hệ</NavLink>
              </li>
              {!user && (
                <>
                  {/* <li>
                    <NavLink to="/register">Register</NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/login">Đăng nhập</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {user && (
            <div className={styles.nav_logOut}>
              <h4 onClick={handleNavAccountPage}>
                <i>Xin chào, {user.name}</i>
              </h4>

              {user && <Logout />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
