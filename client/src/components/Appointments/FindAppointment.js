import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Table } from "reactstrap"
import { getStylists } from "../../data/stylistsData";
import { useNavigate, Link } from "react-router-dom";

export const FindAppointment = () => {
    const [date, setDate] = useState("")
    const [stylists, setStylists] = useState([])
    
    const navigate = useNavigate()

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

    const timeSlots = [];
    for (let hour = 9; hour <= 16; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        timeSlots.push(time);
    }

    function convertTo12HrFormat(timeSlot) {
        const [hours, minutes] = timeSlot.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const adjustedHour = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);

        return `${adjustedHour}:${minutes}0 ${period}`;
    }


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
                                                <td>{convertTo12HrFormat(timeSlot)}</td>
                                                <td>
                                                    {isBooked(timeSlot, stylist) ? 'Not Available' :
                                                        <Link to={`/appointments/book?stylistId=${stylist.id}&timeSlot=${date}T${timeSlot}:00`}>
                                                            <Button>Book Now</Button>
                                                        </Link>

                                                    }
                                                </td>
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