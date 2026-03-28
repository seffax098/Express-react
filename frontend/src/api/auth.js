import { apiClient, authStorage } from "./client";

export const registration = async ({ email, firstName, lastName, password }) => {
    const response = await apiClient.post("/auth/register", {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
    });

    return response.data;
};

export const login = async ({ email, password }) => {
    const response = await apiClient.post("/auth/login", {
        email,
        password,
    });

    authStorage.setTokens(response.data);

    return response.data;
};

export const getMe = async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
};

export const logout = () => {
    authStorage.clear();
};
