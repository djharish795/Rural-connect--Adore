import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const isProduction = window.location.hostname.includes('github.io');
        
        if (isProduction) {
            // Demo mode for GitHub Pages
            if (formData.email && formData.password) {
                const demoUser = {
                    id: 'demo123',
                    username: 'Demo User',
                    email: formData.email,
                    phone: '123-456-7890'
                };
                localStorage.setItem('token', 'demo-token');
                localStorage.setItem('user', JSON.stringify(demoUser));
                setAuth({ token: 'demo-token', user: demoUser });
                navigate('/dashboard');
            } else {
                setError('Please enter email and password');
            }
        } else {
            // Development mode - try API
            try {
                const res = await axios.post('/api/login', formData);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setAuth({ token: res.data.token, user: res.data.user });
                navigate('/dashboard');
            } catch (err) {
                // Fallback to demo mode if API fails
                if (formData.email && formData.password) {
                    const demoUser = {
                        id: 'demo123',
                        username: 'Demo User',
                        email: formData.email,
                        phone: '123-456-7890'
                    };
                    localStorage.setItem('token', 'demo-token');
                    localStorage.setItem('user', JSON.stringify(demoUser));
                    setAuth({ token: 'demo-token', user: demoUser });
                    navigate('/dashboard');
                } else {
                    setError('Demo mode: Please enter any email and password');
                }
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {error && <p className="error-msg">{error}</p>}
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={onChange} required />
                <input type="password" name="password" placeholder="Password" onChange={onChange} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default Login;
