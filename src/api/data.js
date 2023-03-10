import * as api from "./api.js"

const endpoint = {
    "login": "users/login",
    "register": "users/register",
    "logout": "users/logout",
    "dataTeams": "data/teams",
    "getMyTeamsList": (userId) => `data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
    "allMemberships": (teamId) => `data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,
    "membersStatusMember": "data/members?where=status%3D%22member%22",
    "dataMembers": "data/members",
    "membersForId": (userId) => `data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22pending%22&load=team%3DteamId%3Ateams`,
    "getMemberId": (userId,teamId) => `data/members?where=_ownerId%3D%22${userId}%22%20AND%20teamId%3D%22${teamId}%22`

}

// data/members?where=_ownerId%3D%22${userId}%22%20AND%20teamId%3D%22${teamId}



export async function approveMembership(id, data) {
    const res = await api.put(endpoint.dataMembers + "/" + id, data)
    return res
}

export async function delTeamMember(memberId) {
    const res = await api.del(endpoint.dataMembers + "/" + memberId)
    return res
}
export async function postJoinTeam(teamId) {
    const res = await api.post(endpoint.dataMembers, { teamId })
    return res
}

export async function getMemberId(userId,teamId) {
    const res = await api.get(endpoint.getMemberId(userId,teamId));
    if(res.length > 0) {
        return res[0]._id
    }
    return null
}
export async function getMembersStatusMember() {
    const res = await api.get(endpoint.membersStatusMember);
    return res
}

export async function getListAllMemberships(teamId) {
    const res = await api.get(endpoint.allMemberships(teamId));
    return res
}

export async function getTeamHomeInfo(id) {
    const res = await api.get(endpoint.dataTeams + "/" + id);
    return res

}

export async function createTeam(name, logoUrl, description) {
    const res = await api.post(endpoint.dataTeams, { name, logoUrl, description })
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
    const res = await api.get(endpoint.dataTeams);
    return res;
}