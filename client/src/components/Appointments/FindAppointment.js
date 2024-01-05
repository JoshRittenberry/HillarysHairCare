import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Table } from "reactstrap"
import { getStylists } from "../../data/stylistsData";

export const FindAppointment = () => {
    const [date, setDate] = useState("")
    const [stylists, setStylists] = useState([])
    
    useEffect(() => {
        setDate(getCurrentDate)
        getStylists().then(setStylists)
    }, [])

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (`0${today.getMonth() + 1}`).slice(-2); // Add 1 because months are 0-indexed
        const day = (`0${today.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };



    // Create an array of time slots
    const timeSlots = [];
    for (let hour = 9; hour <= 16; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        timeSlots.push(time);
    }

    // Function to check if a time slot is booked
    const isBooked = (timeSlot, stylist) => {
        return stylist.appointments.some(appointment => {
            const [appointmentDate, appointmentTime] = appointment.scheduled.split('T');
            return appointmentDate === date && appointmentTime.startsWith(timeSlot);
        });
    };
    
    return (
        <>
            <h2>Book an Appointment</h2>
            <Input
                id="date"
                name="date"
                placeholder="date placeholder"
                type="date"
                value={date}
                onChange={e => {
                    if (e.target.value < getCurrentDate()) {
                        setDate(getCurrentDate())
                    } else {
                        setDate(e.target.value)
                    }
                }}
            />
            <section className="stylist-list">
                {stylists.map(stylist => {
                    if (stylist.isActive) {
                        return (
                            <div key={`stylist-${stylist.id}`}>
                                <h5>{stylist.firstName} {stylist.lastName}</h5>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Availability</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeSlots.map(timeSlot => (
                                            <tr key={`timeSlot-${timeSlot}`}>
                                                <td>{timeSlot}</td>
                                                <td>{isBooked(timeSlot, stylist) ? 'Booked' : <Button>Book</Button>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    }
                })}
            </section>
        </>
    )
}