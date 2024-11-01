import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor cho yêu cầu
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // Lấy access token từ cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho phản hồi
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra xem lỗi có phải là do token hết hạn không
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken"); // Lấy refresh token từ cookies
        const response = await axios.post(
          "http://localhost:3000/auth/refresh-token",
          {
            refresh_token: refreshToken,
          }
        );

        if (response.status === 200) {
          const { accessToken } = response.data; // Lấy access token mới
          Cookies.set("accessToken", accessToken); // Lưu access token mới vào cookies

          // Cập nhật header Authorization của yêu cầu gốc với access token mới
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Thực hiện lại yêu cầu gốc với access token mới
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
