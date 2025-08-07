import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [contactForm, setContactForm] = useState({ name: '', message: '' });
    const [formMessage, setFormMessage] = useState('');

    useEffect(() => {
        axios.get('/api/services').then(res => setServices(res.data));
        axios.get('/api/products').then(res => {
            setProducts(res.data);
            setFilteredProducts(res.data);
        });
        axios.get('/api/news').then(res => setNews(res.data));
    }, []);

    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);
    
    const handleContactChange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };
    
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/contact', contactForm);
            setFormMessage(res.data.msg);
            setContactForm({ name: '', message: '' });
        } catch (error) {
            setFormMessage('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="container">
            <header className="hero">
                <h1>Connecting Rural Communities</h1>
                <p>Your one-stop platform for essential groceries, medicines, and services.</p>
            </header>

            <section id="services" className="section">
                <h2>Our Services</h2>
                <div className="grid">
                    {services.map(s => <div key={s._id} className="card"><h3>{s.name}</h3></div>)}
                </div>
            </section>

            <section id="products" className="section">
                <h2>Available Products</h2>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="grid">
                    {filteredProducts.map(p => (
                        <div key={p._id} className="card product-card">
                            {/* <img src={`/images/${p.imageUrl}`} alt={p.name} /> */}
                            <h3>{p.name}</h3>
                            <p>${p.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="news" className="section">
                <h2>News & Updates</h2>
                <div className="news-list">
                    {news.map((n, i) => <div key={i} className="news-item"><p>{n.headline}</p></div>)}
                </div>
            </section>

            <section id="contact" className="section">
                <h2>Contact Us</h2>
                <div className="contact-container">
                    <div className="contact-info">
                        <p><strong>Address:</strong> 123 Rural Lane, Villagetown, State, 12345</p>
                        <p><strong>Helpline:</strong> 1800-123-4567</p>
                    </div>
                    <form onSubmit={handleContactSubmit} className="contact-form">
                        <input type="text" name="name" placeholder="Your Name" value={contactForm.name} onChange={handleContactChange} required />
                        <textarea name="message" placeholder="Your Message" value={contactForm.message} onChange={handleContactChange} required></textarea>
                        <button type="submit">Send Message</button>
                        {formMessage && <p className="form-message">{formMessage}</p>}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
