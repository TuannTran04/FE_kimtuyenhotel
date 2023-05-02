import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const PageNotFound = () => {
  return (
    <div className="notFound_page">
      <h1 style={{ textAlign: "center", padding: "30px 15px" }}>
        404 Error Page
      </h1>
      <p className="zoom-area">
        <b>OPPSSSSSS!!</b> Page not found {`:((`}{" "}
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to="/" className="more-link">
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
