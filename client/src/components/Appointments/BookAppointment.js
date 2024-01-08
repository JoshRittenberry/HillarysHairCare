import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap"
import { getStylistById } from "../../data/stylistsData"
import { getServices } from "../../data/servicesData"
import { createCustomer, getCustomers } from "../../data/customersData"
import { createAppointment } from "../../data/appointmentsData"

export const BookAppointment = () => {
    const [searchParams] = useSearchParams()

    const [timeSlot, setTimeSlot] = useState("")
    const [stylist, setStylist] = useState({})
    const [customers, setCustomers] = useState([])
    const [availableServices, setAvailableServices] = useState([])

    const [customer, setCustomer] = useState({})
    const [appointment, setAppointment] = useState({})

    // useEffect(() => {
    //     setTimeSlot(searchParams.get('timeSlot'))
    //     getStylistById(searchParams.get('stylistId')).then(setStylist)
    //     getCustomers().then(setCustomers)
    //     getServices().then(setAvailableServices)
    //     setCustomer({
    //         firstName: "",
    //         lastName: "",
    //         phoneNumber: null,
    //         email: ""
    //     })
    //     setAppointment({
    //         stylistId: stylist?.id,
    //         customerId: 0,
    //         scheduled: timeSlot,
    //         isComplete: false,
    //         isCanceled: false
    //     })
    // }, [])

    // const handleButtonClick = (event) => {
    //     // Find a customer in the customers array that matches all properties of the customer state
    //     const matchingCustomer = customers.find(c =>
    //         c.firstName === customer.firstName &&
    //         c.lastName === customer.lastName &&
    //         c.phoneNumber === customer.phoneNumber &&
    //         c.email === customer.email
    //     )

    //     if (matchingCustomer) {
    //         // Perform action if a matching customer is found
    //         console.log("Matching customer found:", matchingCustomer)
    //         let update = {...appointment}
    //         update.customerId = matchingCustomer.id
    //         setAppointment(update)
    //     } else {
    //         // Perform action if no matching customer is found
    //         console.log("No matching customer found.")
    //         createCustomer(customer).then(res => {
    //             console.log("New customer created:", res)
    //             let update = {...appointment}
    //             update.stylistId = stylist.id
    //             update.customerId = res.id
    //             update.scheduled = timeSlot
    //             setAppointment(update)
    //             console.log(appointment)
    //             createAppointment(appointment).then(res => {console.log("New appointment created:", res)})
    //         })
    //     }
    // }

    useEffect(() => {
        setTimeSlot(searchParams.get('timeSlot'))
        getStylistById(searchParams.get('stylistId')).then(setStylist)
        getCustomers().then(setCustomers)
        getServices().then(setAvailableServices)
    }, [])

    useEffect(() => {
        if (stylist && timeSlot) {
            setAppointment(prev => ({
                ...prev,
                stylistId: stylist.id,
                scheduled: timeSlot
            }))
        }
    }, [stylist, timeSlot])

    const handleButtonClick = async (event) => {
        let matchingCustomer = customers.find(c =>
            c.firstName === customer.firstName &&
            c.lastName === customer.lastName &&
            c.phoneNumber === customer.phoneNumber &&
            c.email === customer.email)
        let updatedAppointment = { ...appointment }

        if (matchingCustomer) {
            updatedAppointment.customerId = matchingCustomer.id
        } else {
            let newCustomer = await createCustomer(customer)
            updatedAppointment.customerId = newCustomer.id
        }

        // Now make the API call with the updated appointment data
        let appointmentResponse = await createAppointment(updatedAppointment)
        console.log("New appointment created:", appointmentResponse)
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
                                value={`${stylist.firstName} ${stylist.lastName}`}
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
                                value={timeSlot}
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
                                value={customer.firstName}
                                onChange={event => {
                                    let update = {...customer}
                                    update.firstName = event.target.value
                                    setCustomer(update)
                                }}
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
                                value={customer.lastName}
                                onChange={event => {
                                    let update = { ...customer }
                                    update.lastName = event.target.value
                                    setCustomer(update)
                                }}
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
                        value={customer.email}
                        onChange={event => {
                            let update = { ...customer }
                            update.email = event.target.value
                            setCustomer(update)
                        }}
                    />
                </FormGroup>
                {/* Customer Phone Number Input */}
                <FormGroup>
                    <Input
                        id="bookPhone"
                        name="bookPhone"
                        placeholder="Phone Number"
                        type="tel"
                        value={customer.phoneNumber}
                        onChange={event => {
                            let update = { ...customer }
                            if (parseInt(event.target.value) !== null) {
                                update.phoneNumber = parseInt(event.target.value)
                                setCustomer(update)
                            }
                        }}
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
                <Button onClick={handleButtonClick}>
                    Book Appointment
                </Button>
            </Form>
        </div>
    )
}