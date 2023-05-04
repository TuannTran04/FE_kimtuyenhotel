import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminPagination from "../../components/layout/AdminPagination/AdminPagination";
import {
  activeCuisine,
  deleteCuisine,
  getCuisinesAdmin,
  searchCuisinesAdmin,
} from "../../services/adminService";
import "./AdminCuisine.css";

const PAGE_SIZE = 5;

const AdminCuisine = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page");
  const navigate = useNavigate();
  const [cuisines, setCuisines] = useState([]);
  console.log(cuisines);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
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

  const handleDelelteCuisine = async (cuisineId) => {
    try {
      console.log(cuisineId);
      const res = await deleteCuisine(cuisineId);
      console.log(res);
      setCuisines((prevCuisines) =>
        prevCuisines.filter((cuisine) => cuisine.id !== cuisineId)
      );
    } catch (err) {
      console.log(err);
      alert(err.response.data.error || "DELETE error");
    }
  };
  const handleConfirmDelete = (cuisineId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dòng không?")) {
      handleDelelteCuisine(cuisineId);
    }
  };

  const handleActiveCuisine = async (cuisineId, cuisineDisableb) => {
    try {
      // console.log(cuisineId, cuisineDisableb);
      const toggleActive = cuisineDisableb === 0 ? 1 : 0;
      // console.log(toggleActive);
      const res = await activeCuisine(cuisineId, toggleActive);
      console.log(res);
      setCuisines((prevCuisines) => {
        const updatedCuisines = prevCuisines.map((cuisine) => {
          if (cuisine.id === cuisineId) {
            return {
              ...cuisine,
              disabled: toggleActive,
            };
          }
          return cuisine;
        });
        return updatedCuisines;
      });
    } catch (err) {
      console.log(err);
      alert(err.response.data.error || "ACTIVE error");
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const renderCuisines = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const res = await searchCuisinesAdmin(searchQuery, filter);
          console.log(res);
          setCuisines(res.data);
        } else {
          const res = await getCuisinesAdmin(
            currentPage,
            PAGE_SIZE,
            null,
            filter
          );
          // console.log(res.total);
          setCuisines(res.data);
          setTotalPages(Math.ceil(res.total / PAGE_SIZE));
        }
      } catch (err) {
        console.log(err);
      }
    };
    renderCuisines();
  }, [currentPage, searchQuery, form]);

  // thay đổi page trên url thì update lại data
  useEffect(() => {
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [searchParams]);

  return (
    <div className="adminCuisine_page">
      <div className="adminCuisine_header">
        <h2>Quản lý chủ đề ẩm thực</h2>
      </div>

      <form className="adminCuisine_tools">
        <div>
          <label>
            Tìm kiếm:
            <input
              className="adminCuisine_tools_search"
              type="text"
              placeholder="Tên chủ đề"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </label>

          <label>
            Bộ lọc trạng thái:
            <select
              className="adminCuisine_tools_filter"
              id="room"
              name="filter"
              value={filter}
              onChange={handleChangeFilter}
            >
              <option value="">Tất cả</option>
              <option value={0}>Kích hoạt</option>
              <option value={1}>Bị ẩn</option>
            </select>
          </label>
        </div>
        <Link to={"/admin/admin-add-cuisine"}>Thêm chủ đề</Link>
      </form>

      <div className="adminCuisine_wrap_list">
        <div className="adminCuisine_list">
          <table className="adminCuisine_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên chủ đề</th>
                <th>Giờ mở cửa</th>
                <th>Giờ đóng cửa</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {cuisines.map((cuisine, id) => {
                return (
                  <tr key={cuisine.id}>
                    <td>{cuisine.id}</td>
                    <td>{cuisine.name}</td>
                    <td>{cuisine.opening_time}</td>
                    <td>{cuisine.closing_time}</td>
                    <td style={{ maxWidth: "400px" }}>{cuisine.description}</td>
                    <td style={{ maxWidth: "200px" }}>
                      <span
                        className={
                          cuisine.disabled === 0
                            ? "adminCuisine_active"
                            : "adminCuisine_disabled"
                        }
                      >
                        {cuisine.disabled === 0 ? "Kích hoạt" : "Bị ẩn"}
                      </span>
                    </td>
                    <td className="adminCuisine_action">
                      <form action="">
                        <button
                          className="adminCuisine_action-edit"
                          onClick={(e) => {
                            navigate(`/admin/admin-edit-cuisine/${cuisine.id}`);
                          }}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </form>

                      <form action="">
                        <button
                          className="adminCuisine_action-delete"
                          onClick={(e) => {
                            e.preventDefault();
                            return handleConfirmDelete(cuisine.id);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </form>

                      <form action="">
                        <button
                          className={
                            cuisine.disabled === 0
                              ? "adminRoom_action-disabled"
                              : "adminRoom_action-active"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            return handleActiveCuisine(
                              cuisine.id,
                              cuisine.disabled
                            );
                          }}
                        >
                          {cuisine.disabled === 0 ? (
                            <i className="fa-solid fa-eye-slash"></i>
                          ) : (
                            <i className="fa-solid fa-eye"></i>
                          )}
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <AdminPagination
          paginationData={{
            currentPage,
            totalPages,
            setCurrentPage: setCurrentPage,
          }}
        />
      </div>
    </div>
  );
};

export default AdminCuisine;
