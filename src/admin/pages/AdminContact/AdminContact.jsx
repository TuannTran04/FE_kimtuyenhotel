import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminPagination from "../../components/layout/AdminPagination/AdminPagination";
import {
  changeStatusContact,
  deleteContact,
  //   deleteContact,
  getContactAdmin,
  searchContactAdmin,
  //   searchContactAdmin,
} from "../../services/adminService";
import "./AdminContact.css";

const PAGE_SIZE = 5;

const AdminContact = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page");
  const navigate = useNavigate();
  const [contact, setContacts] = useState([]);
  console.log(contact);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  const [totalPages, setTotalPages] = useState(0);

  const newUrl = `${window.location.pathname}?page=${currentPage}`;
  window.history.pushState(null, null, newUrl);

  const [form, setFormValue] = useState({
    status: 1,
    filter: "",
  });
  console.log(form);
  const { status, filter } = form;

  const handleChangeStatus = async (contactId, e) => {
    try {
      // console.log([e.target]);
      const { name, value } = e.target;
      console.log(name, value);
      console.log(contactId);
      const formData = { status: value };
      const res = await changeStatusContact(contactId, formData);
      console.log(res);

      setFormValue((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      alert(res.message);
    } catch (err) {
      console.log(err);
      console.log(err || "change error");
    }
  };

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

  const handleDeleteContact = async (contactId) => {
    try {
      console.log(contactId);
      const res = await deleteContact(contactId);
      console.log(res);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactId)
      );
    } catch (err) {
      console.log(err);
      alert(err.response.data.error || "DELETE error");
    }
  };
  const handleConfirmDelete = (contactId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa liên hệ này không?")) {
      handleDeleteContact(contactId);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const renderContact = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const res = await searchContactAdmin(searchQuery, filter);
          console.log(res);
          setContacts(res.data);
        } else {
          const res = await getContactAdmin(currentPage, PAGE_SIZE, filter);
          // console.log(res.total);
          setContacts(res.data);
          // setFormValue(res.data[0].status);
          setTotalPages(Math.ceil(res.total / PAGE_SIZE));
        }
      } catch (err) {
        console.log(err);
      }
    };
    renderContact();
  }, [currentPage, searchQuery, form]);

  // thay đổi page trên url thì update lại data
  useEffect(() => {
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [searchParams]);

  return (
    <div className="adminContact_page">
      <div className="adminContact_header">
        <h2>Danh sách liên hệ khách hàng</h2>
      </div>

      <form className="adminContact_tools">
        <label>
          Tìm kiếm:
          <input
            className="adminContact_tools_search"
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
            <option value={1}>Chưa liên hệ</option>
            <option value={0}>Đã liên hệ</option>
          </select>
        </label>
      </form>

      <div className="adminContact_wrap_list">
        <div className="adminContact_list">
          <table className="adminContact_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên khách</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Tin nhắn</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {contact.map((contact, id) => (
                <tr key={id}>
                  <td>{contact.id}</td>
                  <td style={{ maxWidth: "400px" }}>{contact.name}</td>
                  <td style={{ maxWidth: "400px" }}>{contact.email}</td>
                  <td style={{ maxWidth: "400px" }}>{contact.phone}</td>
                  <td style={{ maxWidth: "400px" }}>{contact.message}</td>
                  <td>
                    {/* 0 là đã liên hệ, 1 là chưa liên hệ */}
                    <span
                      className={
                        contact.disabled === 0
                          ? "adminContact_active"
                          : "adminContact_disabled"
                      }
                    >
                      {contact.disabled === 0 ? "Đã liên hệ" : "Chưa liên hệ"}
                    </span>
                  </td>
                  <td className="adminContact_action">
                    <form action="">
                      <select
                        id="room"
                        name="status"
                        value="default"
                        onChange={(e) => {
                          e.preventDefault();
                          return handleChangeStatus(contact.id, e);
                        }}
                      >
                        <option disabled value="default">
                          Trạng thái
                        </option>
                        <option value={1}>Chưa liên hệ</option>
                        <option value={0}>Đã liên hệ</option>
                      </select>
                    </form>

                    <form action="">
                      <button
                        className="adminContact_action-delete"
                        onClick={(e) => {
                          e.preventDefault();
                          return handleConfirmDelete(contact.id);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
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
            setCurrentPage: setCurrentPage,
          }}
        />
      </div>
    </div>
  );
};

export default AdminContact;
