import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editFAQ, getFAQsAdmin } from "../../services/adminService";
import "./AdminFAQEdit.css";

const AdminFAQEdit = () => {
  const { faqId } = useParams();
  console.log(faqId);

  const [form, setFormValue] = useState({
    id: 0,
    question: "",
    answer: "",
  });
  console.log(form);

  const { id, question, answer } = form;

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
      const formData = form;
      console.log(formData);

      const response = await editFAQ(formData, faqId);
      console.log(response);
      alert(response.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error || "EDIT error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFAQsAdmin(null, null, faqId);
        console.log(res);
        if (res.data.length === 0) {
          throw new Error("khong co faq nay");
        } else {
          // setFormValue(...res.data);
          setFormValue((prevState) => ({
            ...prevState,
            ...res.data[0],
          }));
        }

        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [faqId]);

  return (
    <div className="adminEditFAQ_page">
      <div className="adminEditFAQ_header">
        <h2>Chỉnh sửa câu hỏi</h2>
      </div>

      <div className="adminEditFAQ_wrap_form">
        <div className="adminEditFAQ_form">
          <div className="adminEditFAQ_form_fill">
            <label htmlFor="">ID</label>
            <input
              type="text"
              name="id"
              onChange={handleChange}
              placeholder="1"
              value={id}
              readOnly
            />
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Câu hỏi</label>
            <textarea
              name="question"
              cols="30"
              rows="5"
              onChange={handleChange}
              placeholder="..."
              value={question}
            ></textarea>
          </div>
          <div className="adminEditRoom_form_fill">
            <label htmlFor="">Trả lời</label>
            <textarea
              name="answer"
              cols="30"
              rows="5"
              onChange={handleChange}
              placeholder="..."
              value={answer}
            ></textarea>
          </div>
        </div>
        <div className="adminEditFAQ_wrap_btn">
          <button className="adminEditFAQ_btn" onClick={handleSubmitForm}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFAQEdit;
