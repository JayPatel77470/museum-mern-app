import { getToken } from "./authenticate"

let token = getToken();

export async function addToFavourites(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, { headers: { "Authorization": `JWT ${token}` } }, {
        method: 'PUT',
        body: JSON.stringify({ id: id }),
        headers: {
            'content-type': 'application/json',
        },
    })

    if (res.status === 200) {
        return res.json();
    } else {
        return [];
    }
}

export async function removeFromFavourites(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, { headers: { "Authorization": `JWT ${token}` } }, {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
        headers: {
            'content-type': 'application/json',
        },
    })

    if (res.status === 200) {
        return res.json();
    } else {
        return [];
    }
}

export async function getFavourites() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, { headers: { "Authorization": `JWT ${token}` } }, {
        method: 'GET',
        // body: JSON.stringify({ id: id }),
        headers: {
            'content-type': 'application/json',
        },
    })

    if (res.status === 200) {
        return res.json();
    } else {
        return [];
    }
}

export async function addToHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, { headers: { "Authorization": `JWT ${token}` } }, {
        method: 'PUT',
        body: JSON.stringify({ id: id }),
        headers: {
            'content-type': 'application/json',
        },
    })

    if (res.status === 200) {
        return res.json();
    } else {
        return [];
    }
}

export async function removeFromHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, { headers: { "Authorization": `JWT ${token}` } }, {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
        headers: {
            'content-type': 'application/json',
        },
    })

    if (res.status === 200) {
        return res.json();
    } else {
        return [];
    }
}

export async function getHistory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, { headers: { "Authorization": `JWT ${token}` } }, {
        method: 'GET',
        // body: JSON.stringify({ id: id }),
        headers: {
            'content-type': 'application/json',
        },
    })

    if (res.status === 200) {
        return res.json();
    } else {
        return [];
    }
}


