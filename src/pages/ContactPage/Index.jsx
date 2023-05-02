import React from "react";
import Footer from "../../components/layout/Footer/Footer";
import GotoUp from "../../components/layout/GotoUp/GotoUp";
import Header from "../../components/layout/Header/Header";
import SliderIns from "../../features/SliderIns/SliderIns";
import ContactPage from "./ContactPage";

const Index = () => {
  return (
    <div>
      <Header />
      <ContactPage />
      <SliderIns />
      <Footer />
      <GotoUp />
    </div>
  );
};

export default Index;
