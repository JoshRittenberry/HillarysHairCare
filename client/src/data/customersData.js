const _apiUrl = "/api/customers"

export const getCustomers = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const getCustomerById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
}

export const createCustomer = (customer) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(customer),
    }).then(res => res.json())
}