import * as api from "./api.js"

const endpoint = {
    "login": "users/login",
    "register": "users/register",
    "logout": "users/logout",
    "getAllTeamsList": "data/teams",

}


export async function login(email, password) {
    const res = await api.post(endpoint.login, { email, password });
    localStorage.setItem("userData", JSON.stringify(res));
    return res
}

export async function register(email, username, password) {
    const res = await api.post(endpoint.register, { email, username, password });
    return res
}

export async function logout() {
    const res = await api.get(endpoint.logout);
    localStorage.removeItem("userData");
    return res;
}

export async function getAllTeamsList() {
    const res = await api.get(endpoint.getAllTeamsList);
    return res;
}