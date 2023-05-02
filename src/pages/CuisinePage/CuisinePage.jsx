import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SliderCuisine from "../../features/SliderCuisine/SliderCuisine";
import { getListCuisine } from "../../services/roomService";
import ProductPag from "../ProductPage/ProductPag";
import "./CuisinePage.css";

const PAGE_SIZE = 2;

const CuisinePage = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page");
  // console.log(pageNumber);
  const [cuisines, setCuisines] = useState([]);
  // console.log(cuisines);

  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  // console.log(currentPage);
  const [totalPages, setTotalPages] = useState(0);

  const newUrl = `${window.location.pathname}?page=${currentPage}`;
  window.history.pushState(null, null, newUrl);

  useEffect(() => {
    const searchCuisines = async () => {
      try {
        const res = await getListCuisine(currentPage, PAGE_SIZE);
        // console.log(res.total);
        setCuisines(res.data);
        setTotalPages(Math.ceil(res.total / PAGE_SIZE));
      } catch (err) {
        console.log(err);
      }
    };
    searchCuisines();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // thay đổi page trên url thì update lại data
  useEffect(() => {
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [searchParams]);

  return (
    <div className="cuisine_page">
      <div className="cuisine_top">
        <div className="cuisine_top_img"></div>
        <div className="cuisine_top_intro">
          <h2 className="cuisine_top_heading">Ẩm thực</h2>
          <p className="cuisine_top_para">ngonnnnnnnnnnnn!!!!!</p>
        </div>
      </div>

      <div className="cuisine_bottom">
        <div className="cuisine_bottom_wrapper">
          {cuisines.map((cuisine, i) => {
            return (
              <div className="cuisine_item" key={cuisine.id}>
                <div
                  className={`cuisine_wrap_content${
                    i % 2 === 1 ? " right" : ""
                  }`}
                >
                  <div className="cuisine_content">
                    <h4>{cuisine.name}</h4>
                    <div className="cuisine_description">
                      <p>{cuisine.description}</p>

                      <span>
                        Giờ mở cửa: {cuisine.opening_time} đến{" "}
                        {cuisine.closing_time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="cuisine_slider">
                  <SliderCuisine imgSlider={cuisine.img_slider} />
                </div>
              </div>
            );
          })}
          {/* <div className="cuisine_item">
            <div className="cuisine_wrap_content">
              <div className="cuisine_content">
                <h4>Nhà hàng</h4>
                <div className="cuisine_description">
                  <p>
                    Không chỉ ở lối kiến ​​trúc, ẩm thực của nhà hàng cũng mang
                    đậm nét truyền thống Việt Nam từ những món ăn dân dã dân dã
                    đến hải sản, đặc sản. Qua bàn tay chế biến tài hoa của các
                    đầu bếp, Ẩm Thực Truyền Thống Việt Nam luôn mang đến cho
                    thực khách những trải nghiệm mới lạ, nhưng vẫn giữ được cái
                    “chất” của hương vị Việt.
                  </p>

                  <span>Giờ mở cửa: 09:00:00 đến 21:00:00</span>
                </div>
              </div>
            </div>
            <div className="cuisine_slider">
              <SliderCuisine />
            </div>
          </div> */}

          {/* <div className="cuisine_item">
            <div className="cuisine_wrap_content right">
              <div className="cuisine_content">
                <h4>Nhà hàng</h4>
                <div className="cuisine_description">
                  <p>
                    Không chỉ ở lối kiến ​​trúc, ẩm thực của nhà hàng cũng mang
                    đậm nét truyền thống Việt Nam từ những món ăn dân dã dân dã
                    đến hải sản, đặc sản. Qua bàn tay chế biến tài hoa của các
                    đầu bếp, Ẩm Thực Truyền Thống Việt Nam luôn mang đến cho
                    thực khách những trải nghiệm mới lạ, nhưng vẫn giữ được cái
                    “chất” của hương vị Việt.
                  </p>

                  <span>Giờ mở cửa: 09:00:00 đến 21:00:00</span>
                </div>
              </div>
            </div>
            <div className="cuisine_slider">
              <SliderCuisine />
            </div>
          </div> */}

          <ProductPag
            paginationData={{
              currentPage,
              totalPages,
              setCurrentPage: setCurrentPage,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CuisinePage;
