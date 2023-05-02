import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SliderService from "../../features/SliderService/SliderService";
import { getListService } from "../../services/roomService";
import ProductPag from "../ProductPage/ProductPag";
import "./ServicePage.css";

const PAGE_SIZE = 2;

const ServicePage = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page");
  // console.log(pageNumber);
  const [services, setServices] = useState([]);
  // console.log(services);

  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  // console.log(currentPage);
  const [totalPages, setTotalPages] = useState(0);

  const newUrl = `${window.location.pathname}?page=${currentPage}`;
  window.history.pushState(null, null, newUrl);

  useEffect(() => {
    const renderServices = async () => {
      try {
        const res = await getListService(currentPage, PAGE_SIZE);
        // console.log(res.total);
        setServices(res.data);
        setTotalPages(Math.ceil(res.total / PAGE_SIZE));
      } catch (err) {
        console.log(err);
      }
    };
    renderServices();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // thay đổi page trên url thì update lại data
  useEffect(() => {
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [searchParams]);

  return (
    <div className="service_page">
      <div className="service_top">
        <div className="service_top_img"></div>
        <div className="service_top_intro">
          <h2 className="service_top_heading">Dịch vụ</h2>
          <p className="service_top_para">đầy đủ, tiện nghi, thoải mái!!!!!</p>
        </div>
      </div>

      <div className="service_bottom">
        <div className="service_bottom_wrapper">
          {services.map((service, i) => {
            return (
              <div className="service_item" key={service.id}>
                <div
                  className={`service_wrap_content${
                    i % 2 === 1 ? " right" : ""
                  }`}
                >
                  <div className="service_content">
                    <h4>{service.name}</h4>
                    <div className="service_description">
                      <p>{service.description}</p>

                      <span>
                        Giờ mở cửa: {service.opening_time} đến{" "}
                        {service.closing_time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="service_slider">
                  <SliderService imgSlider={service.img_slider} />
                </div>
              </div>
            );
          })}
          {/* <div className="service_item">
            <div className="service_wrap_content">
              <div className="service_content">
                <h4>Spa</h4>
                <div className="service_description">
                  <p>
                    Lạc vào Spa Furama Resort sang trọng và quyến rũ để tận
                    hưởng những phút giây thư giãn tuyệt đối giữa không gian
                    thiên nhiên. Tại đây, bạn có thể đắm mình trong những trải
                    nghiệm spa độc đáo, được chắt lọc từ những tinh hoa nghệ
                    thuật của phương Đông và phương Tây. Spa Furama Resort là
                    nơi tôn vinh cái đẹp, là thiên đường của nghỉ dưỡng và hưởng
                    thụ.
                  </p>

                  <span>Giờ mở cửa: 09:00:00 đến 21:00:00</span>
                </div>
              </div>
            </div>
            <div className="service_slider">
              <SliderService />
            </div>
          </div> */}

          {/* <div className="service_item">
            <div className="service_wrap_content right">
              <div className="service_content">
                <h4>Yoga</h4>
                <div className="service_description">
                  <p>
                    Khách nghỉ tại Furama Resort có thể tham gia lớp học Yoga
                    của khách sạn để thư giãn tâm hồn và lấy lại cân bằng trước
                    khi bắt đầu một ngày mới.
                  </p>

                  <span>Giờ mở cửa: 09:00:00 đến 21:00:00</span>
                </div>
              </div>
            </div>
            <div className="service_slider">
              <SliderService />
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

export default ServicePage;
