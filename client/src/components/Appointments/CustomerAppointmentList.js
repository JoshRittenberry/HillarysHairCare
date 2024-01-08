import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../../data/customersData";
import { Table } from "reactstrap";

export const CustomerAppointmentList = () => {
    const params = useParams();
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        getCustomerById(params.id).then(setCustomer);
    }, []);

    const getCurrentDate = () => {
        return new Date(); // Returns the current date and time
    };

    function formatReadableDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <>
            <h2>Appointments</h2>
            {/* Upcomming Appointments */}
            <section>
                <h3>Upcomming Appointments</h3>
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
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </Table>
            </section>

            {/* Previous Appointments */}
            <section>
                <h3>Previous Appointments</h3>
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
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </Table>
            </section>
        </>
    );
};