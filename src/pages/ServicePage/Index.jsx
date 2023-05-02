import React from "react";
import Footer from "../../components/layout/Footer/Footer";
import GotoUp from "../../components/layout/GotoUp/GotoUp";
import Header from "../../components/layout/Header/Header";
import ServicePage from "./ServicePage";

const Index = () => {
  return (
    <div>
      <Header />
      <ServicePage />
      <Footer />
      <GotoUp />
    </div>
  );
};

export default Index;
