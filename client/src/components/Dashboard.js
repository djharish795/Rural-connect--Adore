import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = ({ auth }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const config = { headers: { 'x-auth-token': auth.token } };
                const res = await axios.get(`/api/bookings/${auth.user.id}`, config);
                setBookings(res.data);
            } catch (error) {
                console.error("Could not fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };
        if (auth.token) {
            fetchBookings();
        }
    }, [auth]);

    return (
        <div className="container dashboard">
            <h2>Dashboard</h2>
            <p>Welcome, {auth.user?.username}!</p>
            <Link to="/edit-profile" className="btn-secondary">Edit Profile</Link>
            
            <div className="section">
                <h3>Your Bookings</h3>
                {loading ? <p>Loading bookings...</p> : (
                    bookings.length > 0 ? (
                        <ul className="booking-list">
                            {bookings.map(b => (
                                <li key={b._id} className="booking-item">
                                    <strong>Booking Date:</strong> {new Date(b.bookingDate).toLocaleDateString()}
                                    <ul>
                                        {b.products.map(p => <li key={p._id}>{p.name} (Qty: {p.quantity})</li>)}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : <p>You have no bookings yet. (Booking functionality to be added)</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
