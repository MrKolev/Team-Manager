const host = "http://localhost:3030/"
async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        if (response.status == 204) {
            return response;
        }

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 409) {
                localStorage.clear();
            }

            throw new Error(data.message)
        }

        return data;

    } catch (error) {

        throw error
    }
}

function getOptions(method, body) {
    const options = {
        method,
        headers: {}
    }

    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
        options.headers['X-Authorization'] = user.accessToken
    }

    if (body) {
        options.headers["Content-Type"] = "Application/json",
            options.body = JSON.stringify(body)
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions("GET"))
}

export async function post(url, data) {
    return await request(url, getOptions("POST", data))
}

export async function put(url, data) {
    return await request(url, getOptions("PUT", data))
}

export async function del(url) {
    return await request(url, getOptions("DELETE"))
}