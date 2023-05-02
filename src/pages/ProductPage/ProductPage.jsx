import clsx from "clsx";
import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { getRooms, getSearchRooms } from "../../services/roomService";
import { Link, useSearchParams } from "react-router-dom";
import ProductPag from "./ProductPag";

const PAGE_SIZE = 5; // Số lượng phòng hiển thị trên một trang

function ProductPage() {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page");
  // console.log(pageNumber);

  const [rooms, setRooms] = useState([]);
  console.log(rooms);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  // console.log(currentPage);
  const [totalPages, setTotalPages] = useState(0);

  const newUrl = `${window.location.pathname}?page=${currentPage}`;
  window.history.pushState(null, null, newUrl);

  // form này chỉ để làm flag reload giao diện
  const [form, setFormValue] = useState({
    filter: "",
  });
  console.log(form);
  const { filter } = form;
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    if (value) {
      setFormValue((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
    } else {
      setFormValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const searchRooms = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const res = await getSearchRooms(
            currentPage,
            PAGE_SIZE,
            searchQuery,
            filter
          );
          console.log(res);
          setRooms(res.data);
          setTotalPages(Math.ceil(res.total / PAGE_SIZE));
        } else {
          const res = await getRooms(currentPage, PAGE_SIZE, filter);
          console.log(res);
          setRooms(res.data);
          setTotalPages(Math.ceil(res.total / PAGE_SIZE));
        }
      } catch (err) {
        console.log(err);
      }
    };
    searchRooms();
  }, [currentPage, searchQuery, form]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // thay đổi page trên url thì update lại data
  useEffect(() => {
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [searchParams]);

  return (
    <div className="product_page">
      {/* {console.log(totalPages)} */}
      <div className="product_top">
        {/* <img src="/assets/ProductPage_img/pic_top_1.jpg" alt="" /> */}
        <div className="product_top_img"></div>
        <div className="product_top_intro">
          <h2 className="product_top_heading">Phòng nghỉ</h2>
          <p className="product_top_para">Các phòng đa dạng, phong cách!!!!!</p>
        </div>
      </div>

      {/* <div className="product_page_bg"></div> */}

      <div className="product_list">
        <div className="product_container">
          <form className="product_tools">
            <label>
              Tìm kiếm phòng:
              <input
                className="product_tools_search"
                type="text"
                placeholder="tên phòng"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </label>

            <label>
              Bộ lọc trạng thái:
              <select
                className="product_tools_filter"
                id="room"
                name="filter"
                value={filter}
                onChange={handleChangeFilter}
              >
                <option value="">Tất cả</option>
                <option value={0}>Còn phòng</option>
                <option value={1}>Hết phòng</option>
              </select>
            </label>
          </form>

          {rooms.map((item, i) => {
            const roomName = item.name.toLowerCase().replace(/\s+/g, "_");

            return (
              <div key={item.id} className="product_item">
                <div className="product_background">
                  {/* <img
                    src={`/assets/ProductPage_img/pic_top_1.jpg`}
                    alt="room_1"
                  /> */}
                  <img
                    // src={`http://localhost:9090/rooms_img/${roomName}_img/${roomName}_bg.jpg`}
                    // src={`http://localhost:9090${item.avatar}`}
                    src={process.env.REACT_APP_BACKEND_URL + `${item.avatar}`}
                    alt="room_1"
                  />
                </div>

                <div
                  className={clsx("product_info", {
                    product_info_left: (i + 1) % 2 !== 0 ? true : false,
                    product_info_right: (i + 1) % 2 === 0 ? true : false,
                  })}
                >
                  <h2 className="product_info_heading">{item.name}</h2>

                  <span className="product_info_price">
                    {parseFloat(item.price).toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                    / NGÀY
                  </span>

                  <p className="product_info_describe">{item.description}</p>

                  <ul className="product_info_view">
                    <li>Số lượng: {item.quantity}</li>
                    <li>Diện tích: {item.area}</li>
                    <li>Hướng nhìn: {item.view_direction}</li>
                    <li>Loại giường: {item.bed_type}</li>
                  </ul>

                  <div className="product_info_btn">
                    <Link
                      to={`/detail-page/${item.name.replace(/\s+/g, "-")}/${
                        item.id
                      }`}
                      state={{ roomData: item, haha: "test" }}
                      className="product_more"
                    >
                      Xem thêm
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

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
}

export default ProductPage;
