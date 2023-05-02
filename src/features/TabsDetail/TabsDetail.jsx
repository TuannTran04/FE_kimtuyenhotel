import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TabsDetail.css";
import { useLocation } from "react-router-dom";
import FAQDetail from "../FAQDetail/FAQDetail";
import AmenitiesDetail from "../AmenitiesDetail/AmenitiesDetail";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className="tab_info"
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "0 25px" }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const TabsDetail = ({ roomData }) => {
  const {
    hotel_id,
    id,
    name,
    price,
    description,
    area,
    quantity,
    view_direction,
    bed_type,
    avatar,
    img_slider,
    disabled,
  } = roomData;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "30px",
        marginBottom: "30px",
        minHeight: "250px",
        // height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Tổng quan" {...a11yProps(0)} />
        <Tab label="Tiện nghi" {...a11yProps(1)} />
        <Tab label="FAQs" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className="tab_info_wrapper">
          <div className="tab_info_top">
            <p>{description}</p>
          </div>
          <div className="tab_info_bottom">
            <div className="tab_info_bottom_item">
              <h4>Thông tin</h4>
              <ul>
                <li>Số lượng: {quantity}</li>
                <li>Diện tích: {area}</li>
                <li>Hướng nhìn: {view_direction}</li>
                <li>Loại giường: {bed_type}</li>
              </ul>
            </div>
            <div className="tab_info_bottom_item">
              <h4>Đặc biệt</h4>
              <ul>
                <li>Fitness</li>
                <li>Hồ bơi</li>
                <li>Giặt ủi</li>
              </ul>
            </div>
            <div className="tab_info_bottom_item">
              <h4>Dịch vụ khác</h4>
              <ul>
                <li>Spa</li>
                <li>Yoga</li>
                <li>Nhà hàng</li>
                <li>Quẩy bar</li>
              </ul>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AmenitiesDetail />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FAQDetail />
      </TabPanel>
    </Box>
  );
};

export default TabsDetail;
