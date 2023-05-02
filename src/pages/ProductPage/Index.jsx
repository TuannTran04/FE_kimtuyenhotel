import React from "react";
import Footer from "../../components/layout/Footer/Footer";
import GotoUp from "../../components/layout/GotoUp/GotoUp";
import Header from "../../components/layout/Header/Header";
import ProductPage from "./ProductPage";

const Index = () => {
  return (
    <div>
      <Header />
      <ProductPage />
      <GotoUp />
      <Footer />
    </div>
  );
};

export default Index;
