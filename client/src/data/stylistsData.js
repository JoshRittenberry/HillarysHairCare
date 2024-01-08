const _apiUrl = "/api/stylists"

export const getStylists = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const getStylistById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json())
}