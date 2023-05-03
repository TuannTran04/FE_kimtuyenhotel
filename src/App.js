import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/Index";
import LoginPage from "./pages/LoginPage/Index";
import RegisterPage from "./pages/RegisterPage/Index";
import DetailPage from "./pages/DetailPage/Index";
import BookingPage from "./pages/BookingPage/Index";
import ImageUploader from "./features/TestUpload/TestUpload";
import AdminDashboard from "./admin/pages/AdminDashboard/AdminDashboard";
import AdminLogin from "./admin/pages/AdminLogin/AdminLogin";
import AdminRegister from "./admin/pages/AdminRegister/AdminRegister";
import AdminRoom from "./admin/pages/AdminRoom/AdminRoom";
import AdminBooking from "./admin/pages/AdminBooking/AdminBooking";
import AdminCustomer from "./admin/pages/AdminCustomer/AdminCustomer";
import AdminAddroom from "./admin/features/AdminAddroom/AdminAddroom";
import PageNotFound from "./pages/NotFoundPage/NotFoundPage";
import AdminEditRoom from "./admin/features/AdminRoomEdit/AdminRoomEdit";
import AdminBookingEdit from "./admin/features/AdminBookingEdit/AdminBookingEdit";
import AdminCustomerEdit from "./admin/features/AdminCustomerEdit/AdminCustomerEdit";
import ForgetPasswordPage from "./pages/ForgetPasswordPage/Index";
import AdminForgetPassword from "./admin/pages/AdminForgetPassword/AdminForgetPassword";
import AdminFAQs from "./admin/pages/AdminFAQs/AdminFAQs";
import AdminFAQEdit from "./admin/features/AdminFAQEdit/AdminFAQEdit";
import AdminAddFAQ from "./admin/features/AdminAddFAQ/AdminAddFAQ";
import AdminMusic from "./admin/pages/AdminMusic/AdminMusic";
import AdminAddSinger from "./admin/features/AdminAddSinger/AdminAddSinger";
import CuisinePage from "./pages/CuisinePage/Index";
import ServicePage from "./pages/ServicePage/Index";
import ContactPage from "./pages/ContactPage/Index";
import AdminContact from "./admin/pages/AdminContact/AdminContact";
import AdminCuisine from "./admin/pages/AdminCuisine/AdminCuisine";
import AdminService from "./admin/pages/AdminService/AdminService";
import AdminAddCuisine from "./admin/features/AdminAddCuisine/AdminAddCuisine";
import AdminCuisineEdit from "./admin/features/AdminCuisineEdit/AdminCuisineEdit";
import AdminAddService from "./admin/features/AdminAddService/AdminAddService";
import AdminServiceEdit from "./admin/features/AdminServiceEdit/AdminServiceEdit";
import AdminInfoHotel from "./admin/pages/AdminHotel/AdminInfoHotel";
import AdminInfoHotelEdit from "./admin/features/AdminInfoHotelEdit/AdminInfoHotelEdit";
import AccountPage from "./pages/AccountPage/AccountPage";
import HistoryBookingPage from "./pages/HistoryBookingPage/HistoryBookingPage";
import ChangeInfoPage from "./pages/ChangeInfoPage/ChangeInfoPage";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";
import MusicChillPage from "./pages/MusicChillPage/MusicChillPage";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // const [isAdminLoggedIn, setAdminIsLoggedIn] = useState(
  //   JSON.parse(localStorage.getItem("is-Admin-LoggedIn") || false)
  // );
  const [isUserLoggedIn, setUserIsLoggedIn] = useState(
    localStorage.getItem("info-user") ? true : false
  );
  const [isAdminLoggedIn, setAdminIsLoggedIn] = useState(
    localStorage.getItem("info-admin") ? true : false
  );

  return (
    <div className="App">
      <Routes>
        {/* Các route user */}
        <Route
          path="/login"
          element={isUserLoggedIn ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isUserLoggedIn ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/forget-password"
          element={
            isUserLoggedIn ? <Navigate to="/" /> : <ForgetPasswordPage />
          }
        />
        <Route
          path="/account-page"
          element={isUserLoggedIn ? <AccountPage /> : <Navigate to="/" />}
        >
          <Route
            path="/account-page/change-info"
            element={<ChangeInfoPage />}
          />
          <Route
            path="/account-page/change-password"
            element={<ChangePasswordPage />}
          />
          <Route
            path="/account-page/history-booking"
            element={<HistoryBookingPage />}
          />
          <Route
            path="/account-page/music-chill"
            element={<MusicChillPage />}
          />
        </Route>

        <Route path="/" element={<HomePage />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/detail-page/:name/:id" element={<DetailPage />} />
        <Route path="/booking-page/:name/:id" element={<BookingPage />} />
        <Route path="/cuisine-page" element={<CuisinePage />} />
        <Route path="/service-page" element={<ServicePage />} />
        <Route path="/contact-page" element={<ContactPage />} />

        {/* Các route admin */}
        <Route
          exact
          path="/admin/login"
          element={isAdminLoggedIn ? <Navigate to="/admin" /> : <AdminLogin />}
        />

        <Route
          exact
          path="/admin/forget-password"
          element={
            isAdminLoggedIn ? <Navigate to="/admin" /> : <AdminForgetPassword />
          }
        />

        {/* <Route
          exact
          path="/admin/register"
          element={
            isAdminLoggedIn ? <Navigate to="/admin" /> : <AdminRegister />
          }
        /> */}

        <Route
          exact
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        >
          <Route path="/admin/admin-info-hotel" element={<AdminInfoHotel />} />
          <Route
            path="/admin/admin-edit-info-hotel/:hotelId"
            element={<AdminInfoHotelEdit />}
          />

          <Route path="/admin/admin-room" element={<AdminRoom />} />
          <Route path="/admin/admin-add-room" element={<AdminAddroom />} />
          <Route
            path="/admin/admin-edit-room/:roomId"
            element={<AdminEditRoom />}
          />
          <Route path="/admin/admin-booking" element={<AdminBooking />} />
          <Route
            path="/admin/admin-edit-booking/:bookingId"
            element={<AdminBookingEdit />}
          />
          <Route path="/admin/admin-customer" element={<AdminCustomer />} />
          {/* <Route
            path="/admin/admin-edit-customer/:customerId"
            element={<AdminCustomerEdit />}
          /> */}

          <Route path="/admin/admin-faq" element={<AdminFAQs />} />
          <Route path="/admin/admin-add-faq" element={<AdminAddFAQ />} />
          <Route
            path="/admin/admin-edit-faq/:faqId"
            element={<AdminFAQEdit />}
          />

          <Route path="/admin/admin-contact" element={<AdminContact />} />

          <Route path="/admin/admin-cuisine" element={<AdminCuisine />} />
          <Route
            path="/admin/admin-add-cuisine"
            element={<AdminAddCuisine />}
          />
          <Route
            path="/admin/admin-edit-cuisine/:cuisineId"
            element={<AdminCuisineEdit />}
          />

          <Route path="/admin/admin-service" element={<AdminService />} />
          <Route
            path="/admin/admin-add-service"
            element={<AdminAddService />}
          />
          <Route
            path="/admin/admin-edit-service/:serviceId"
            element={<AdminServiceEdit />}
          />

          <Route path="/admin/admin-music" element={<AdminMusic />} />
          <Route path="/admin/admin-add-singer" element={<AdminAddSinger />} />
        </Route>

        {/* DEFAULT ROUTE */}
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/page-not-found" replace />} />
      </Routes>

      {/* <ImageUploader /> */}
    </div>
  );
}

export default App;
