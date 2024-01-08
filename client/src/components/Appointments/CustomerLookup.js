import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap"
import { getCustomers } from "../../data/customersData";
import { useNavigate } from "react-router-dom";

export const CustomerLookup = () => {
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getCustomers().then(setCustomers)
    }, [])

    const handleButtonClick = async (event) => {
        let matchingCustomer = customers.find(c =>
            c.firstName === customer.firstName &&
            c.lastName === customer.lastName &&
            c.phoneNumber === customer.phoneNumber &&
            c.email === customer.email)

        if (matchingCustomer) {
            navigate(`/appointments/view/customer/${matchingCustomer.id}`)
        } else {
            window.alert("No Matching Customer Found")
        }
    }

    return (
        <>
            <h2>Customer Lookup</h2>
            <Form>
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
                                    let update = { ...customer }
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
                <Button onClick={e => {
                    e.preventDefault()
                    handleButtonClick()
                }}>
                    Find My Appointments
                </Button>
            </Form>
        </>
    )
}