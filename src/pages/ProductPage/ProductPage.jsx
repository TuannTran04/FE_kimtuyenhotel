import clsx from "clsx";
import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { getRooms, getSearchRooms } from "../../services/roomService";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../../components/layout/Loading/Loading";
import AccountPagination from "../../components/layout/AccountPagination/AccountPagination";
import "./ProductPage.css";

// const PAGE_SIZE = 5; // Số lượng phòng hiển thị trên một trang

function ProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFullScreen, setIsLoadingFullScreen] = useState(true);
  console.log(isLoading);
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page");
  // console.log(pageNumber);

  const [rooms, setRooms] = useState([]);
  console.log(rooms);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  const [pageSize, setPageSize] = useState(5);
  console.log(pageSize);
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

  const handleChangePageSize = (e) => {
    const { name, value } = e.target;
    setPageSize((prevState) => value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const searchRooms = async () => {
      try {
        if (searchQuery.trim() !== "") {
          setIsLoading(true);
          const res = await getSearchRooms(
            currentPage,
            pageSize,
            searchQuery,
            filter
          );
          console.log(res);
          setRooms(res.data);
          setTotalPages(Math.ceil(res.total / pageSize));
          setIsLoading(false);
        } else {
          setIsLoading(true);
          const res = await getRooms(currentPage, pageSize, filter);
          console.log(res);
          setRooms(res.data);
          setTotalPages(Math.ceil(res.total / pageSize));
          // Chỉ render isLoadingFullScreen cho lần đầu tiên
          setIsLoadingFullScreen(false);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    searchRooms();
  }, [currentPage, searchQuery, form, pageSize]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // thay đổi page trên url thì update lại data
  useEffect(() => {
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [searchParams]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="product_page">
      {/* {console.log(totalPages)} */}
      {/* // Render fullScreen chỉ khi isLoading và isLoadingFullScreen cùng là true */}
      {isLoading && isLoadingFullScreen ? <Loading fullScreen /> : ""}
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
                placeholder="Tên phòng"
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

            <label>
              Hiện số lượng:
              <select
                className="product_tools_pageSize"
                name="pageSize"
                value={pageSize}
                onChange={handleChangePageSize}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </label>
          </form>

          {isLoading && !isLoadingFullScreen ? (
            <Loading />
          ) : (
            rooms.map((item, i) => {
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
                      src={item.avatar_2}
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
            })
          )}

          <AccountPagination
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
