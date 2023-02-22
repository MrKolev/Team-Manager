import * as api from "./api.js"

const endpoint = {
    "login": "users/login",
    "register": "users/register",
    "logout": "users/logout",
    "getAllTeamsList": "data/teams",
    "getMyTeamsList": (userId) => `data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
    "createTeam": "data/teams",
    "teamHomeInfo": "data/teams/",
    "allMemberships": (teamId) => `data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`

}

export async function getListAllMemberships(teamId){
    const res = await api.get(endpoint.allMemberships(teamId));
    return res
} 

export async function getTeamHomeInfo(id){
    const res = await api.get(endpoint.teamHomeInfo + id);
    return res

}

export async function createTeam(name, logoUrl, description) {
    const res = await api.post(endpoint.createTeam, { name, logoUrl, description })
    return res
}

export async function getMyTeamsList(id) {
    const res = await api.get(endpoint.getMyTeamsList(id));
    return res
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