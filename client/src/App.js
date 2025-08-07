import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProfileEdit from './components/ProfileEdit';
import './App.css';

function App() {
    const [auth, setAuth] = useState({ token: null, user: null });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            setAuth({ token, user: JSON.parse(user) });
        }
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth({ token: null, user: null });
    };

    return (
        <Router>
            <Navbar auth={auth} onLogout={handleLogout} />
            <main>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login setAuth={setAuth} />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    <Route path="/dashboard" element={auth.token ? <Dashboard auth={auth} /> : <Navigate to="/login" />} />
                    <Route path="/edit-profile" element={auth.token ? <ProfileEdit auth={auth} setAuth={setAuth} /> : <Navigate to="/login" />} />
                    
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
