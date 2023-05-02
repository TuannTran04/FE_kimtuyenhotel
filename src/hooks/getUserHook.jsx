import { useEffect } from "react";
import _ from "lodash";
import { getUser } from "../services/userService";

const useGetUser = (customerId) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUser(customerId);
        console.log(res);
        console.log(res.data);

        // Nếu không có user nào có id tương ứng
        if (_.isEmpty(res.data)) {
          localStorage.removeItem("info-user");
        }
        // Nếu có user thì lưu vào localStorage
        if (!_.isEmpty(res.data)) {
          localStorage.setItem("info-user", JSON.stringify(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [customerId]);
};

export default useGetUser;
