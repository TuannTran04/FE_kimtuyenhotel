import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomersAdmin, editCustomer } from "../../services/adminService";
import "./AdminCustomerEdit.css";

const AdminCustomerEdit = () => {
  const { customerId } = useParams();
  // console.log(customerId);
  // const navigate = useNavigate();

  const [form, setFormValue] = useState({
    id: 0,
    email: "",
    name: "",
  });
  console.log(form);

  const { id, email, name } = form;

  const handleChange = (e) => {
    // console.log([e.target]);
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!email || !name) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    try {
      const formData = { id, email, name };
      console.log(formData);

      const response = await editCustomer(formData, customerId);
      console.log(response);
      alert(response.message);
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.error.error);
      alert(error.response.data.error.error || "EDIT error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCustomersAdmin(null, null, customerId, null);
        console.log(res);
        if (res.data.length === 0) {
          throw new Error("khong co customer nay");
        } else {
          setFormValue(...res.data);
        }

        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [customerId]);

  return (
    <div className="adminEditCustomer_page">
      <div className="adminEditCustomer_header">
        <h2>Chỉnh sửa thông tin khách hàng</h2>
      </div>

      <div className="adminEditCustomer_wrap_form">
        <div className="adminEditCustomer_form">
          <div className="adminEditCustomer_form_fill">
            <label htmlFor="">ID</label>
            <input
              type="text"
              name="userId"
              onChange={handleChange}
              placeholder="1"
              value={id}
              readOnly
            />
          </div>
          <div className="adminEditCustomer_form_fill">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="user@gmail.com"
              value={email}
            />
          </div>
          <div className="adminEditCustomer_form_fill">
            <label htmlFor="">Tên</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="user123"
              value={name}
            />
          </div>
        </div>
        <div className="adminEditCustomer_wrap_btn">
          <button className="adminEditCustomer_btn" onClick={handleSubmitForm}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerEdit;
