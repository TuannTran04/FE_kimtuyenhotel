import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./AccountPage.css";
import Header from "../../components/layout/Header/Header";
import AccountSidebar from "../../components/layout/AccountSidebar/AccountSidebar";

const AccountPage = () => {
  const location = useLocation();
  const isHome = location.pathname === "/account-page";
  return (
    <div>
      <Header />
      <AccountSidebar location={location} />
      <div className="account_page">
        <div className="account_wrap_content">
          <div className="account_content">
            {isHome ? "homepage" : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
