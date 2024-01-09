const _apiUrl = "/api/appointments"

export const getAppointmentById = (appointmentId) => {
    return fetch(`${_apiUrl}/${appointmentId}`).then(res => res.json())
}

export const createAppointment = (appointment) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
    }).then(res => res.json())
}

export const cancelAppointment = (appointmentId) => {
    return fetch(`${_apiUrl}/cancel/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentId),
    })
}