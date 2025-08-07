import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = ({ auth, setAuth }) => {
    const [formData, setFormData] = useState({ username: '', phone: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user) {
            setFormData({
                username: auth.user.username || '',
                phone: auth.user.phone || ''
            });
        }
    }, [auth.user]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const isProduction = window.location.hostname.includes('github.io');
        
        if (isProduction || auth.token === 'demo-token') {
            // Demo mode for GitHub Pages
            const updatedUser = { ...auth.user, username: formData.username, phone: formData.phone };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setAuth({ ...auth, user: updatedUser });
            
            setMessage('Profile updated successfully! (Demo mode)');
            setTimeout(() => navigate('/dashboard'), 1500);
        } else {
            // Development mode - try API
            try {
                const config = { headers: { 'x-auth-token': auth.token } };
                const res = await axios.put('/api/profile', formData, config);
                
                // Update user in local storage and app state
                const updatedUser = { ...auth.user, ...res.data };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setAuth({ ...auth, user: updatedUser });
                
                setMessage('Profile updated successfully!');
                setTimeout(() => navigate('/dashboard'), 1500);
            } catch (err) {
                // Fallback to demo mode
                const updatedUser = { ...auth.user, username: formData.username, phone: formData.phone };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setAuth({ ...auth, user: updatedUser });
                
                setMessage('Profile updated successfully! (Demo mode)');
                setTimeout(() => navigate('/dashboard'), 1500);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Profile</h2>
            {message && <p className="success-msg">{message}</p>}
            <form onSubmit={onSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={onChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={onChange} />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileEdit;
