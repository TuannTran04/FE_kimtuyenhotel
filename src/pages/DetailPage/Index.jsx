import React from "react";
import Footer from "../../components/layout/Footer/Footer";
import GotoUp from "../../components/layout/GotoUp/GotoUp";
import Header from "../../components/layout/Header/Header";
import DetailPage from "./DetailPage";

const Index = () => {
  return (
    <div>
      <Header />
      <DetailPage />
      <GotoUp />
      <Footer />
    </div>
  );
};

export default Index;
