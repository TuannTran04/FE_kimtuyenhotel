import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/layout/Footer/Footer";
import GotoUp from "../../components/layout/GotoUp/GotoUp";
import Header from "../../components/layout/Header/Header";
import About from "../../features/About/About";
import Facilities from "../../features/Facilities/Facilities";
import Rooms from "../../features/Rooms/Rooms";
import SliderHome from "../../features/Slider/SliderHome";
import SliderIns from "../../features/SliderIns/SliderIns";
import useGetUser from "../../hooks/getUserHook";
import style from "./HomePage.module.css";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  console.log(user);

  return (
    <div className={style.test_home}>
      <Header />
      <SliderHome />
      <GotoUp />
      <About />
      <Rooms />
      <Facilities />
      <SliderIns />
      <Footer />
    </div>
  );
};

export default HomePage;
