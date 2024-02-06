const API_HOST = "http://localhost:4000";
const DEFAULT_AVATAR = "https://github.com/ghost.png";

async function fetchData(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

async function getUsers() {
    const data = await fetchData(`${API_HOST}/profiles`);

    if (data.length === 0) {
        return null;
    }
    return data;
}

async function getUser(id) {
    const data = await fetchData(`${API_HOST}/profiles?id=${id}`);

    if (data.length === 0) {
        return null;
    }
    return data[0];
}

async function getUserByName(username) {
    const data = await fetchData(`${API_HOST}/profiles?username=${username}`);

    if (data.length === 0) return null;
    return data[0];
}

async function updateUser(id, props) {
    await fetchData(`${API_HOST}/profiles?id=${id}`, {
        method: "put",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(props)
    });
}

async function getGithubAvatar(username) {
    const resp = await fetch(`https://api.github.com/users/${username}`);

    if (resp.status !== 200) return DEFAULT_AVATAR;
    const body = await resp.json();

    if (body["avatar_url"] !== null) return body["avatar_url"];

    return DEFAULT_AVATAR;
}

async function createUser(username) {
    const profile = {
        "username": username,
        "avatar": await getGithubAvatar(username),
    }

    await fetchData(`${API_HOST}/profiles`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
    });

    return profile;
}

async function deleteUser(id) {
    await fetchData(`${API_HOST}/profiles/${id}`, {
        method: "delete",
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

function getDefaultUser() {
    return {
        "username": "Default",
        "avatar": DEFAULT_AVATAR,
        "id": 0
    }
}

export { getUsers, getUser, getDefaultUser, updateUser, getUserByName, createUser, deleteUser };
