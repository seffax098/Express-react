import axios from "axios";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const API_BASE_URL = "http://localhost:3000/api";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

const refreshClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

export const authStorage = {
    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },
    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },
    setTokens({ accessToken, refreshToken }) {
        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        }

        if (refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
    },
    clear() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },
};

let refreshRequest = null;

const refreshTokens = async () => {
    const refreshToken = authStorage.getRefreshToken();

    if (!refreshToken) {
        throw new Error("No refresh token");
    }

    const response = await refreshClient.post("/auth/refresh", { refreshToken });
    authStorage.setTokens(response.data);

    return response.data.accessToken;
};

apiClient.interceptors.request.use((config) => {
    const accessToken = authStorage.getAccessToken();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const isAuthRequest = originalRequest?.url?.includes("/auth/login")
            || originalRequest?.url?.includes("/auth/register")
            || originalRequest?.url?.includes("/auth/refresh");

        if (!originalRequest || status !== 401 || originalRequest._retry || isAuthRequest) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            if (!refreshRequest) {
                refreshRequest = refreshTokens().finally(() => {
                    refreshRequest = null;
                });
            }

            const newAccessToken = await refreshRequest;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);
        } catch (refreshError) {
            authStorage.clear();
            return Promise.reject(refreshError);
        }
    }
);
