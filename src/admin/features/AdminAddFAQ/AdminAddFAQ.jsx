import React, { useState } from "react";
import { addFAQAdmin } from "../../services/adminService";
import "./AdminAddFAQ.css";

const AdminAddFAQ = () => {
  const [form, setFormValue] = useState({
    question: "",
    answer: "",
  });
  console.log(form);

  const { question, answer } = form;

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
    if (!question || !answer) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    try {
      const formData = { question, answer };
      console.log(formData);

      const response = await addFAQAdmin(formData);
      console.log(response);
      alert(response.message);
      setFormValue((prev) => ({
        ...prev,
        question: "",
        answer: "",
      }));
    } catch (error) {
      console.log(error);
      alert(error.response.data.error || "ADD error");
    }
  };

  return (
    <div className="adminAddFAQ_page">
      <div className="adminAddFAQ_header">
        <h2>Thêm câu hỏi</h2>
      </div>
      <div className="adminAddFAQ_wrap_form">
        <div className="adminAddFAQ_form">
          <div className="adminAddFAQ_form_fill">
            <label htmlFor="">Câu hỏi</label>
            <textarea
              name="question"
              id=""
              cols="30"
              rows="5"
              onChange={handleChange}
              placeholder="...."
              value={question}
            ></textarea>
          </div>
          <div className="adminAddFAQ_form_fill">
            <label htmlFor="">Trả lời</label>
            <textarea
              name="answer"
              id=""
              cols="30"
              rows="5"
              onChange={handleChange}
              placeholder="...."
              value={answer}
            ></textarea>
          </div>
        </div>
        <div className="adminAddFAQ_wrap_btn">
          <button className="adminAddFAQ_btn" onClick={handleSubmitForm}>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddFAQ;
