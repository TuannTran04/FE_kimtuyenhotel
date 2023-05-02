import React from "react";
import Footer from "../../components/layout/Footer/Footer";
import GotoUp from "../../components/layout/GotoUp/GotoUp";
import Header from "../../components/layout/Header/Header";
import BookingPage from "./BookingPage";

const Index = () => {
  return (
    <div>
      <Header />
      <BookingPage />
      <Footer />
      <GotoUp />
    </div>
  );
};

export default Index;
