async function getUsers() {
    const response = await fetch("http://localhost:4000/profiles");
    const data = await response.json();

    if (data.length === 0) {
        return null;
    }
    return data;
}

async function getUser(id) {
    const response = await fetch(`http://localhost:4000/profiles?id=${id}`);
    const data = await response.json();

    if (data.length === 0) {
        return null;
    }
    return data[0];
}

async function updateUser(id, props) {
    await fetch(`http://localhost:4000/profiles?id=${id}`, {
        method: "put",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(props)
    });
}

async function getDefaultUser() {
    const response = await fetch("http://localhost:4000/profiles?_order=desc&_limit=1");
    const data = await response.json();

    if (data.length === 0) {
        await createDefaultProfile();
        return await getDefaultUser();
    }

    return data[0];
}

async function createDefaultProfile() {
    await fetch("http://localhost:4000/profiles", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": "Defaut",
            "avatar": "https://github.com/ghost.png",
        })
    });
}


export { getUsers, getUser, getDefaultUser, updateUser }