import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminPagination from "../../components/layout/AdminPagination/AdminPagination";
import {
  activeCustomer,
  deleteCustomer,
  getCustomersAdmin,
  searchCustomersAdmin,
} from "../../services/adminService";
import "./AdminCustomer.css";

const PAGE_SIZE = 5;

const AdminCustomer = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page");
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  console.log(customers);
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

  const handleDeleteCustomer = async (customerId) => {
    try {
      console.log(customerId);
      const res = await deleteCustomer(customerId);
      console.log(res);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== customerId)
      );
    } catch (err) {
      console.log(err);
      alert(err.response.data.error || "DELETE error");
    }
  };
  const handleConfirmDelete = (customerId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người này không?")) {
      handleDeleteCustomer(customerId);
    }
  };

  const handleActiveCustomer = async (customerId, customerDisableb) => {
    try {
      // console.log(roomId, roomDisableb);
      const toggleActive = customerDisableb === 0 ? 1 : 0;
      // console.log(toggleActive);
      const res = await activeCustomer(customerId, toggleActive);
      console.log(res);
      setCustomers((prevCustomers) => {
        const updatedCustomers = prevCustomers.map((customer) => {
          if (customer.id === customerId) {
            return {
              ...customer,
              disabled: toggleActive,
            };
          }
          return customer;
        });
        return updatedCustomers;
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
    const renderRoom = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const res = await searchCustomersAdmin(searchQuery, filter);
          console.log(res);
          setCustomers(res.data);
        } else {
          const res = await getCustomersAdmin(
            currentPage,
            PAGE_SIZE,
            null,
            filter
          );
          // console.log(res.total);
          setCustomers(res.data);
          setTotalPages(Math.ceil(res.total / PAGE_SIZE));
        }
      } catch (err) {
        console.log(err);
      }
    };
    renderRoom();
  }, [currentPage, searchQuery, form]);

  // thay đổi page trên url thì update lại data
  useEffect(() => {
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [searchParams]);

  return (
    <div className="adminCustomer_page">
      <div className="adminCustomer_header">
        <h2>Quản lý tài khoản khách hàng</h2>
      </div>

      <form className="adminCustomer_tools">
        <label>
          Tìm kiếm:
          <input
            className="adminCustomer_tools_search"
            type="text"
            placeholder="Tên khách"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </label>

        <label>
          Bộ lọc trạng thái:
          <select
            className="adminBooking_tools_filter"
            id="room"
            name="filter"
            value={filter}
            onChange={handleChangeFilter}
          >
            <option value="">Tất cả</option>
            <option value={0}>Kích hoạt</option>
            <option value={1}>Bị khoá</option>
          </select>
        </label>
      </form>

      <div className="adminCustomer_wrap_list">
        <div className="adminCustomer_list">
          <table className="adminCustomer_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer, id) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <span
                      className={
                        customer.disabled === 0
                          ? "adminCustomer_active"
                          : "adminCustomer_disabled"
                      }
                    >
                      {customer.disabled === 0 ? "Kích hoạt" : "Bị khóa"}
                    </span>
                  </td>
                  <td className="adminCustomer_action">
                    {/* <form action="">
                      <button
                        className="adminCustomer_action-edit"
                        onClick={(e) => {
                          navigate(`/admin/admin-edit-customer/${customer.id}`);
                        }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </form> */}

                    <form action="">
                      <button
                        className="adminCustomer_action-delete"
                        onClick={(e) => {
                          e.preventDefault();
                          return handleConfirmDelete(customer.id);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </form>

                    <form action="">
                      <button
                        className={
                          customer.disabled === 0
                            ? "adminCustomer_action-disabled"
                            : "adminCustomer_action-active"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          return handleActiveCustomer(
                            customer.id,
                            customer.disabled
                          );
                        }}
                      >
                        {customer.disabled === 0 ? (
                          <i className="fa-solid fa-lock"></i>
                        ) : (
                          <i className="fa-solid fa-lock-open"></i>
                        )}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AdminPagination
          paginationData={{
            currentPage,
            totalPages,
            newUrl,
            setCurrentPage: setCurrentPage,
          }}
        />
      </div>
    </div>
  );
};

export default AdminCustomer;
