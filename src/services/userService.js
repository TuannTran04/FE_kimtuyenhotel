import React from "react";
import axios from "../utils/axios";

const handleLogin = (email, password) => {
  return axios.post("/api/v1/login-user", {
    email: email,
    password: password,
  });
};

const registerUser = (email, password, name, confirmPassword) => {
  return axios.post("/api/v1/create-user", {
    email: email,
    password: password,
    name: name,
    confirmPassword: confirmPassword,
  });
};

const forgetPassword = (email, password, confirmPassword) => {
  return axios.post("/api/v1/forget-password-user", {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });
};

const getUser = (customerId) => {
  return axios.get(`/api/v1/get-user?customerId=${customerId}`);
};
const changeInfoUser = (formData, customerId) => {
  return axios.put(
    `/api/v1/change-info-user?customerId=${customerId}`,
    formData
  );
};
const changePasswordUser = (formData, customerId) => {
  return axios.post(
    `/api/v1/change-password-user?customerId=${customerId}`,
    formData
  );
};

const getBookingsAccount = (
  currentPage,
  PAGE_SIZE,
  customerId,
  filterStatus
) => {
  return axios.get(
    `/api/v1/get-bookings-account?page=${currentPage}&pageSize=${PAGE_SIZE}&customerId=${customerId}&filterStatus=${filterStatus}`
  );
};
const searchBookingsAccount = (
  currentPage,
  pageSize,
  searchQuery,
  customerId,
  filterStatus
) => {
  return axios.get(
    `/api/v1/search-bookings-account?page=${currentPage}&pageSize=${pageSize}&q=${searchQuery}&customerId=${customerId}&filterStatus=${filterStatus}`
  );
};

//********************* MANAGE MUSIC ***********************//
const getListChannelId = () => {
  return axios.get(`/api/v1/get-channels-admin`);
};

export {
  handleLogin,
  registerUser,
  getUser,
  changeInfoUser,
  changePasswordUser,
  forgetPassword,
  getBookingsAccount,
  searchBookingsAccount,
  getListChannelId,
};
