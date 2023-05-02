import React from "react";
import { Routes, Route, Link, Navigate, NavLink } from "react-router-dom";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("info-user");
    window.location.href = "/";
  };

  return (
    <>
      <a href="#" onClick={handleLogout}>
        Đăng xuất
      </a>
    </>
  );
};

export default Logout;
