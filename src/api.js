const base = `http://localhost:3000`;

export function getAll(lastId = 0, pageSize = 20, isExpired = true) {
    const url = new URL(`/storage/all`, base);
    url.searchParams.append('lastId', lastId);
    url.searchParams.append('pageSize', pageSize);
    url.searchParams.append('isExpired', isExpired ? 1 : 0);
    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            if (json.error) throw new Error(json.error);
            else return json;
        });
}
export function expireKey(key, expiryDate) {
    const url = new URL(`/storage`, base);
    url.searchParams.append('key', key);
    url.searchParams.append('expiryDate', expiryDate);

    return fetch(url, { method: 'PUT' })
        .then((response) => {
            if (response.ok) {
                return {}; // response body is empty on success
            } else {
                return response.json();
            }
        })
        .then((json) => {
            if (json.error) throw new Error(json.error);
            else return json;
        });
}
