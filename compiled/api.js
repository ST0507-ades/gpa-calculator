var base = 'http://localhost:3000';

export function getAll() {
    var lastId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var isExpired = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var url = new URL('/storage/all', base);
    url.searchParams.append('lastId', lastId);
    url.searchParams.append('pageSize', pageSize);
    url.searchParams.append('isExpired', isExpired ? 1 : 0);
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        if (json.error) throw new Error(json.error);else return json;
    });
}
export function expireKey(key, expiryDate) {
    var url = new URL('/storage', base);
    url.searchParams.append('key', key);
    url.searchParams.append('expiryDate', expiryDate);

    return fetch(url, { method: 'PUT' }).then(function (response) {
        if (response.ok) {
            return {}; // response body is empty on success
        } else {
            return response.json();
        }
    }).then(function (json) {
        if (json.error) throw new Error(json.error);else return json;
    });
}