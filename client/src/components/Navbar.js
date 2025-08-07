import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ auth, onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">RuralConnect</Link>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><a href="/#services">Services</a></li>
                <li><a href="/#products">Products</a></li>
                <li><a href="/#contact">Contact</a></li>
                {auth.token ? (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><button onClick={handleLogoutClick} className="nav-button">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup" className="nav-button-primary">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
