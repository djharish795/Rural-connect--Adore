import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', phone: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const isProduction = window.location.hostname.includes('github.io');
        
        if (isProduction) {
            // Demo mode for GitHub Pages
            if (formData.username && formData.email && formData.password) {
                setMessage('Registration successful! (Demo mode) - Redirecting to login...');
                setError('');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError('Please fill in all required fields');
                setMessage('');
            }
        } else {
            // Development mode - try API
            try {
                const res = await axios.post('/api/register', formData);
                setMessage(res.data.msg);
                setError('');
                setTimeout(() => navigate('/login'), 2000);
            } catch (err) {
                // Fallback to demo mode
                if (formData.username && formData.email && formData.password) {
                    setMessage('Registration successful! (Demo mode) - Redirecting to login...');
                    setError('');
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setError('Demo mode: Please fill in all required fields');
                    setMessage('');
                }
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            {error && <p className="error-msg">{error}</p>}
            {message && <p className="success-msg">{message}</p>}
            <form onSubmit={onSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={onChange} required />
                <input type="email" name="email" placeholder="Email" onChange={onChange} required />
                <input type="password" name="password" placeholder="Password" minLength="6" onChange={onChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={onChange} />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Signup;
