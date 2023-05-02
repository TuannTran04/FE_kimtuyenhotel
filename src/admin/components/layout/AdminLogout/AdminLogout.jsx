import React from "react";
import "./AdminLogout.css";

const AdminLogout = () => {
  const handleAdminLogout = () => {
    localStorage.removeItem("info-admin");
    localStorage.removeItem("is-Admin-LoggedIn");
    window.location.href = "/admin/login";
  };

  return (
    <>
      <a href="#" onClick={handleAdminLogout}>
        Đăng xuất
      </a>
    </>
  );
};

export default AdminLogout;
