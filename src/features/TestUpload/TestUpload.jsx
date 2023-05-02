import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

function ImageUploader() {
  const [file, setFile] = useState(null);
  // console.log(file);
  const [imagePath, setImagePath] = useState(
    JSON.parse(localStorage.getItem("imagePath")) || null
  );
  console.log(imagePath);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("haha", file);
      console.log(formData);
      console.log(...formData.entries());

      const res = await axios.post("/api/v1/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          roomName: "Deluxe Sky",
        },
      });
      console.log(res);

      setImagePath(res.imagePath);
      localStorage.setItem("imagePath", JSON.stringify(res.imagePath));

      // Nếu đã có ảnh hiển thị trên giao diện và danh sách ảnh đã lưu trữ đủ hai ảnh, xóa ảnh đầu tiên
      if (imagePath && res.message === "ok") {
        await axios.delete("/api/v1/delete-image", {
          data: { roomName: "Deluxe Sky" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Kiểm tra local storage có đường dẫn ảnh hay không
    const storedImagePath = JSON.parse(localStorage.getItem("imagePath"));
    if (storedImagePath) {
      setImagePath(storedImagePath);
    }
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imagePath && <img src={`http://localhost:9090${imagePath}`} alt="pic" />}
    </div>
  );
}

export default ImageUploader;
