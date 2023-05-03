import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./AccountPage.css";
import Header from "../../components/layout/Header/Header";
import AccountSidebar from "../../components/layout/AccountSidebar/AccountSidebar";
import Loading from "../../components/layout/Loading/Loading";

const AccountPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/account-page";

  return (
    <div>
      <Header />
      <AccountSidebar location={location} setIsLoading={setIsLoading} />
      <div className="account_page">
        {isLoading ? <Loading partly /> : ""}
        <div className="account_wrap_content">
          <div className="account_content">
            {isHome ? (
              "homepage"
            ) : (
              <Outlet context={[isLoading, setIsLoading]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
