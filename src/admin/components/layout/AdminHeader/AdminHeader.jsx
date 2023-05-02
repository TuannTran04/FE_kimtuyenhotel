import React from "react";
import { Link } from "react-router-dom";
import AdminLogout from "../AdminLogout/AdminLogout";
import "./AdminHeader.css";

const AdminHeader = () => {
  const infoAdmin = JSON.parse(localStorage.getItem("info-admin"));

  return (
    <div className="admin_nav_header">
      <div className="admin_nav_contain">
        <div className="admin_nav_logo">
          <Link to="/admin">
            <img src="/favicon.ico" alt="logo" />
          </Link>
        </div>

        <div className="admin_nav_menu">
          <div className="admin_nav_info">
            {/* <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
            </ul> */}
          </div>

          {infoAdmin && (
            <div className="admin_nav_logOut">
              <h4>
                <i>Xin chào, {infoAdmin.name}</i>
              </h4>

              {infoAdmin && <AdminLogout />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
