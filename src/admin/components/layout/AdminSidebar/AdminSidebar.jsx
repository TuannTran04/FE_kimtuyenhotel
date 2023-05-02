import React from "react";
import { Link } from "react-router-dom";
import { arrTab, arrTab_2 } from "./AdminSidebarConst";
import "./AdminSidebar.css";

const AdminSidebar = ({ location }) => {
  const currentPath = location.pathname;

  const getTabClass = (tabPath) => {
    return tabPath === currentPath ? "active" : "";
  };

  return (
    <div className="adminSidebar">
      <div className="adminSidebar_menu">
        <ul>
          <li className={getTabClass("/admin")}>
            <Link to="/admin">
              <i className="fa-solid fa-house"></i>
              <span>Trang chủ</span>
            </Link>
          </li>

          <li className={getTabClass("/admin/admin-edit-info-hotel")}>
            <Link to="/admin/admin-info-hotel">
              <i className="fa-sharp fa-solid fa-circle-info"></i>
              <span>Thông tin khách sạn</span>
            </Link>
          </li>

          <li className="adminSidebar_list_devider"></li>

          {arrTab.map((tab, i) => (
            <li
              key={i}
              className={getTabClass(tab.path) + " adminSidebar_item"}
            >
              <Link to={tab.path}>
                <i className={tab.icon}></i>
                <span>{tab.name}</span>
              </Link>
            </li>
          ))}

          <li className="adminSidebar_list_devider"></li>

          {arrTab_2.map((tab, i) => (
            <li
              key={i}
              className={getTabClass(tab.path) + " adminSidebar_item"}
            >
              <Link to={tab.path}>
                <i className={tab.icon}></i>
                <span>{tab.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
