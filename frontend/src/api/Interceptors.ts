import { AxiosInstance } from "axios";

const initInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    function (error) {
      if (error.response.status === 401) {
        window.location.href = "/error/unauthorised";
      } else if (error.response.status === 404) {
        window.location.href = "/error";
      }
      return Promise.reject(error);
    },
  );
};

export { initInterceptors };
