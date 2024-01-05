import { useEffect, useState } from "react"
import { getServices } from "../../data/servicesData"
import { Table } from "reactstrap"

export const HomePage = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        getServices().then(setServices)
    }, [])

    return (
        <>
            <div className="homePage">
                <section className="about">
                    <h2>Welcome to Hillary's Hair Salon!</h2>
                    <section>Our Journey: Founded in 2010, Hillary's Hair Salon has been at the forefront of beauty and style in our community. Our salon started as a small, passionate team and has grown into a haven for creativity and sophistication in hairstyling.</section>
                    <section>Our Philosophy: We believe that a great hairstyle is the cornerstone of confidence and personal expression. At Hillary's Hair Salon, we're dedicated to providing not just exceptional hair services, but a warm and welcoming atmosphere where our clients can relax and feel pampered.</section>
                    <section>Our Team: Our stylists are the heart of our salon. They are highly skilled professionals who keep up with the latest trends and techniques in hair care and styling. Each stylist brings their unique flair and expertise, ensuring that every client leaves our salon feeling and looking their best.</section>
                    <section>Our Services: From classic cuts to modern styling, vibrant coloring, and luxurious hair treatments, we offer a wide range of services to suit every hair need and desire. Our goal is to provide personalized attention to each client, understanding their style and preferences to create the perfect look.</section>
                    <section>Community Engagement: At Hillary's Hair Salon, we believe in giving back to the community that has supported us. We regularly participate in local events and charities, fostering a spirit of togetherness and social responsibility.</section>
                    <section>Visit Us: Nestled in the heart of the city, our salon is a space where creativity meets relaxation. Whether you're seeking a transformative new look or just a touch-up, our team is ready to welcome you. Book your appointment today and experience the magic of Hillary's Hair Salon!</section>
                </section>
                <aside className="services">
                    <Table>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(s => (
                                <tr key={`services-${s.id}`}>
                                    <td>{s.name}</td>
                                    <td>{s.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </aside>
            </div>
        </>
    )
}