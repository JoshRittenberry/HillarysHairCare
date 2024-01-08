const _apiUrl = "/api/appointmentService"

export const createAppointmentService = (appointmentService) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentService),
    })
}