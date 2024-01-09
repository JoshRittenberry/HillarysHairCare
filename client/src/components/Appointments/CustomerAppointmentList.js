import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../../data/customersData";
import { Button, Table } from "reactstrap";

export const CustomerAppointmentList = () => {
    const params = useParams();
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        getCustomerById(params.id).then(setCustomer);
    }, []);

    const getCurrentDate = () => {
        return new Date(); // Returns the current date and time
    };

    const formatReadableDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    const hasUpcomingAppointments = () => {
        const today = getCurrentDate();
        return customer.appointments?.some(a => new Date(a.scheduled) >= today);
    };

    const hasPreviousAppointments = () => {
        const today = getCurrentDate();
        return customer.appointments?.some(a => new Date(a.scheduled) < today);
    };

    return (
        <>
            <h2>Appointments</h2>

            {/* Upcomming Appointments */}
            <section>
                <h3>Upcoming Appointments</h3>
                {hasUpcomingAppointments() ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Stylist</th>
                                <th>Status</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.appointments?.map(a => {
                                const appointmentDate = new Date(a.scheduled);
                                const today = getCurrentDate();

                                if (appointmentDate >= today) {
                                    return (
                                        <tr key={a.id}>
                                            <td>{formatReadableDate(a.scheduled)}</td>
                                            <td>{a.stylist.firstName} {a.stylist.lastName}</td>
                                            {a.isComplete && (
                                                <td>Completed</td>
                                            )}
                                            {!a.isComplete && a.isCanceled && (
                                                <td>Canceled</td>
                                            )}
                                            {!a.isComplete && !a.isCanceled && (
                                                <td>Scheduled</td>
                                            )}
                                            <td>{a.totalCost}</td>
                                            <td>
                                                <Button onClick={() => {
                                                    let list = "";
                                                    a.appointmentServices.forEach(aserv => {
                                                        list += aserv.service.name + "\n"; // Adding each service name to the list with a newline character
                                                    });
                                                    window.alert(list); // Displaying the list in the alert
                                                }}>Services</Button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <p>No Upcoming Appointments</p>
                )}
            </section>
            
            {/* Previous Appointments */}
            <section>
                <h3>Previous Appointments</h3>
                {hasPreviousAppointments() ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Stylist</th>
                                <th>Status</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.appointments?.map(a => {
                                const appointmentDate = new Date(a.scheduled);
                                const today = getCurrentDate();

                                if (appointmentDate <= today) {
                                    return (
                                        <tr key={a.id}>
                                            <td>{formatReadableDate(a.scheduled)}</td>
                                            <td>{a.stylist.firstName} {a.stylist.lastName}</td>
                                            {a.isComplete && (
                                                <td>Completed</td>
                                            )}
                                            {!a.isComplete && a.isCanceled && (
                                                <td>Canceled</td>
                                            )}
                                            {!a.isComplete && !a.isCanceled && (
                                                <td>Scheduled</td>
                                            )}
                                            <td>{a.totalCost}</td>
                                            <td>
                                                <Button onClick={() => {
                                                    let list = "";
                                                    a.appointmentServices.forEach(aserv => {
                                                        list += aserv.service.name + "\n"; // Adding each service name to the list with a newline character
                                                    });
                                                    window.alert(list); // Displaying the list in the alert
                                                }}>Services</Button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <p>No Previous Appointments</p>
                )}
            </section>
        </>
    );
};