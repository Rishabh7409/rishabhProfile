import axios from "axios";
import toastr from "toastr";
import { URL_CONFIG } from "../../_constant/Config/URL_CONFIG";

const API_AUTH = axios.create({
    baseURL: URL_CONFIG.DEV_URL,
});

API_AUTH.interceptors.request.use(function (request) {
    const token = localStorage.getItem("authToken");
    request.headers.Authorization = token ? `Bearer ${token}` : "";
    return request;
});

API_AUTH.interceptors.response.use((response) => {
    if (response.data.status === 401) {
        localStorage.removeItem("authToken");
        window.location.assign("/login");
    }

    return response;
});

API_AUTH.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
        toastr.error("unauthorized");
        localStorage.removeItem("authToken");
        window.location.assign("/login");
    }
    return Promise.reject(error);
});

export default API_AUTH;

export const setSession = (token) => {
    if (token) {
        localStorage.setItem("authToken", token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
        localStorage.removeItem("authToken");
        delete axios.defaults.headers.common["Authorization"];
    }
};
