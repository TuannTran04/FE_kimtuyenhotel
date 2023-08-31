import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Link, Navigate, NavLink } from "react-router-dom";
import { logOutSuccess } from "../../../store/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.location.href = "/";
    dispatch(logOutSuccess());
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
