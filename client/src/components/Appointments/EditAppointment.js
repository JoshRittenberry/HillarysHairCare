import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap"
import { getServices } from "../../data/servicesData"
import { getAppointmentById } from "../../data/appointmentsData"
import { createAppointmentService, deleteAppointmentService } from "../../data/appointmentServicesData"

export const EditAppointment = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [appointment, setAppointment] = useState({})
    const [availableServices, setAvailableServices] = useState([])
    const [selectedServices, setSelectedServices] = useState([])

    console.log(params)

    useEffect(() => {
        getAppointmentById(params.id).then(res => {
            setAppointment(res)
            setSelectedServices(res.appointmentServices.map(as => as.service))
        })
        getServices().then(setAvailableServices)
    }, [])

    const handleServiceCheck = (service) => {
        setSelectedServices(prevSelectedServices => {
            // Check if the service is already selected
            const isServiceSelected = prevSelectedServices.some(selectedService => selectedService.id === service.id)

            if (isServiceSelected) {
                // If already selected, filter it out
                return prevSelectedServices.filter(selectedService => selectedService.id !== service.id)
            } else {
                // Otherwise, add the new service
                return [...prevSelectedServices, service]
            }
        })
    }


    const handleButtonClick = async () => {
        // Create an array to hold all the promises from the addition of new services
        let additionPromises = selectedServices.map(sserv => {
            if (!appointment.appointmentServices.some(aserv => aserv.serviceId === sserv.id)) {
                let newAppointmentService = {
                    appointmentId: appointment.id,
                    serviceId: sserv.id
                };
                return createAppointmentService(newAppointmentService); // Return the promise
            }
            return Promise.resolve(); // Return a resolved promise for services that don't need addition
        });

        // Create an array to hold all the promises from the removal of unselected services
        let removalPromises = appointment.appointmentServices.map(aserv => {
            if (!selectedServices.some(sserv => sserv.id === aserv.serviceId)) {
                return deleteAppointmentService(aserv.id); // Return the promise
            }
            return Promise.resolve(); // Return a resolved promise for services that don't need removal
        });

        // Wait for all addition and removal operations to complete
        await Promise.all([...additionPromises, ...removalPromises]);

        // After all operations are complete, navigate
        navigate(`/appointments/view/customer/${appointment.customerId}`);
    }



    return (
        <div className="create-booking">
            <h2>Book Appointment</h2>
            <Form>
                {/* Stylist & Appointment Info */}
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                id="stylistName"
                                name="stylistName"
                                type="text"
                                value={`${appointment.stylist?.firstName} ${appointment.stylist?.lastName}`}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                id="bookDate"
                                name="bookDate"
                                type="date"
                                value={appointment.scheduled}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                </Row>
                {/* Customer First & Lastname Inputs */}
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                id="bookFirstName"
                                name="bookFirstName"
                                placeholder="First Name"
                                type="text"
                                value={appointment.customer?.firstName}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                id="bookLastName"
                                name="bookLastName"
                                placeholder="Last Name"
                                type="text"
                                value={appointment.customer?.lastName}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                </Row>
                {/* Customer Email Input */}
                <FormGroup>
                    <Input
                        id="bookEmail"
                        name="bookEmail"
                        placeholder="Email"
                        type="email"
                        value={appointment.customer?.email}
                        readOnly
                    />
                </FormGroup>
                {/* Customer Phone Number Input */}
                <FormGroup>
                    <Input
                        id="bookPhone"
                        name="bookPhone"
                        placeholder="Phone Number"
                        type="tel"
                        value={appointment.customer?.phoneNumber}
                        readOnly
                    />
                </FormGroup>
                <h3>Services</h3>
                {availableServices.map(s => {
                    return (
                        <FormGroup check key={s.id}>
                            <Input
                                id={`service-${s.id}`}
                                name="service"
                                type="checkbox"
                                checked={selectedServices?.some(selectedService => selectedService.id === s.id)}
                                onChange={() => handleServiceCheck(s)}
                            />
                            <Label
                                check
                                for={`service-${s.id}`}
                            >
                                {s.name}
                            </Label>
                        </FormGroup>
                    )
                })}
                <Button onClick={e => {
                    e.preventDefault()
                    handleButtonClick()
                }}>
                    Save Changes
                </Button>
                <Button className="btn-danger" onClick={() => {
                    navigate(`/appointments/view/customer/${appointment.customerId}`)
                }}>
                    Cancel
                </Button>
            </Form>
        </div>
    )
}