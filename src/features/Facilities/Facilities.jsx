import React from "react";
import "./Facilities.css";

const Facilities = () => {
  const arrFaIcon = [
    { id: 1, icon: "car.png", para: "Parking" },
    { id: 2, icon: "safe.png", para: "Safe" },
    { id: 3, icon: "pool.png", para: "Swimming pool" },
    { id: 4, icon: "breakfast.png", para: "Breakfast" },
    { id: 5, icon: "gym.png", para: "Gym" },
    { id: 6, icon: "spa.png", para: "Spa" },
    { id: 7, icon: "wifi.png", para: "Wifi" },
  ];

  return (
    <div className="Facilities">
      <div className="Facilities_heading">
        <h2>Các tiện ích</h2>
      </div>

      <div className="Facilities_list">
        {arrFaIcon.map((item, i) => (
          <div key={i} className="Facilities_item">
            <div className="Facilities_img">
              <img
                src={`assets/Facilities_icon/Facl_icon_${item.icon}`}
                alt={`icon_${i}`}
              />
            </div>
            <div className="Facilities_para">
              <p>{item.para}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
