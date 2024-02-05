const API_HOST = "http://localhost:4000";

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

async function updateUser(id, props) {
    await fetchData(`${API_HOST}/profiles?id=${id}`, {
        method: "put",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(props)
    });
}

async function getDefaultUser() {
    return {
        "username": "Default",
        "avatar": "https://github.com/ghost.png",
    }
}

export { getUsers, getUser, getDefaultUser, updateUser };
