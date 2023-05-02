import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import styles from "./GotoUp.module.css";

const GotoUp = () => {
  const [showArrowTop, setShowArrowTop] = useState(false);
  const arrowRef = useRef();

  useEffect(() => {
    let handleScroll = () => {
      if (window.scrollY >= 400) {
        setShowArrowTop(true);
        // console.log("true");
      } else {
        setShowArrowTop(false);
        // console.log("false");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  useEffect(() => {
    let handleClickToTop = (e) => {
      window.scroll({ top: 0, behavior: "smooth" });
    };

    arrowRef.current.addEventListener("click", handleClickToTop);

    // return () => {
    //   arrowRef.current.removeEventListener("click", handleClickToTop);
    // };
  }, []);

  return (
    <div>
      <div
        ref={arrowRef}
        className={clsx(styles.arrow_up, {
          [styles.arrowUp_show]: showArrowTop,
          [styles.arrowUp_hidden]: !showArrowTop,
        })}
      >
        <p>cc</p>
        <i className={clsx(styles.icon_up, "fa-solid fa-arrow-up")}></i>
      </div>
    </div>
  );
};

export default GotoUp;
