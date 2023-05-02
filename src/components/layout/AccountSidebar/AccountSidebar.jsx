import React from "react";
import { Link } from "react-router-dom";
import { arrTab, arrTab_2 } from "./AccountSidebarConst";
import "./AccountSidebar.css";

const AccountSidebar = ({ location }) => {
  const currentPath = location.pathname;
  const getTabClass = (tabPath) => {
    return tabPath === currentPath ? "active" : "";
  };

  return (
    <div className="accountSidebar">
      <div className="accountSidebar_menu">
        <ul>
          <li className={getTabClass("/account-page")}>
            <Link to="/account-page">
              <i className="fa-solid fa-house"></i>
              <span>Trang chủ</span>
            </Link>
          </li>

          {/* <li className={getTabClass("/admin/admin-edit-info-hotel")}>
            <Link to="/admin/admin-info-hotel">
              <i className="fa-sharp fa-solid fa-circle-info"></i>
              <span>Info Hotel</span>
            </Link>
          </li> */}

          <li className="accountSidebar_list_devider"></li>

          {arrTab.map((tab, i) => (
            <li
              key={i}
              className={getTabClass(tab.path) + " accountSidebar_item"}
            >
              <Link to={tab.path}>
                <i className={tab.icon}></i>
                <span>{tab.name}</span>
              </Link>
            </li>
          ))}

          <li className="accountSidebar_list_devider"></li>

          {arrTab_2.map((tab, i) => (
            <li
              key={i}
              className={getTabClass(tab.path) + " accountSidebar_item"}
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

export default AccountSidebar;
