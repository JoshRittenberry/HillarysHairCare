const _apiUrl = "/api/appointments"

export const createAppointment = (appointment) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
    })
}