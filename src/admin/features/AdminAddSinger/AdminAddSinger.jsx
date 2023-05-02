import React, { useState } from "react";
import { addChannelAdmin } from "../../services/adminService";
import "./AdminAddSinger.css";

const AdminAddSinger = () => {
  const [form, setFormValue] = useState({
    name: "",
    channel_id: "",
  });
  console.log(form);

  const { name, channel_id } = form;

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
    if (!name || !channel_id) {
      alert("Nhập đầy đủ các trường");
      return;
    }
    try {
      const formData = { name, channel_id };
      console.log(formData);

      const response = await addChannelAdmin(formData);
      console.log(response);
      alert(response.message);
      setFormValue({
        name: "",
        channel_id: "",
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="adminAddSinger_page">
      <div className="adminAddSinger_header">
        <h2>Add Singer</h2>
      </div>
      <div className="adminAddSinger_wrap_form">
        <div className="adminAddSinger_form">
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="name singer"
              value={name}
            />
          </div>
          <div className="adminAddRoom_form_fill">
            <label htmlFor="">Channel Id</label>
            <input
              type="text"
              name="channel_id"
              onChange={handleChange}
              placeholder="channel youtube id of singer"
              value={channel_id}
            />
          </div>
        </div>

        <a
          href="https://www.streamweasels.com/tools/youtube-channel-id-and-user-id-convertor/"
          target="_blank"
          rel="noreferrer"
        >
          {`Link để convert name=>id : https://www.streamweasels.com/tools/youtube-channel-id-and-user-id-convertor/`}
        </a>

        <div className="adminAddSinger_wrap_btn">
          <button className="adminAddSinger_btn" onClick={handleSubmitForm}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddSinger;
