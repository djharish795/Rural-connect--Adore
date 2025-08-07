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

    // Static data for GitHub Pages deployment
    const staticServices = [
        { _id: '1', name: 'Grocery Delivery', iconUrl: 'grocery.png' },
        { _id: '2', name: 'Medicine Supply', iconUrl: 'medicine.png' },
        { _id: '3', name: 'Bill Payments', iconUrl: 'bill.png' },
        { _id: '4', name: 'Agri-Support', iconUrl: 'agri.png' },
        { _id: '5', name: 'Health Checkup', iconUrl: 'health.png' }
    ];

    const staticProducts = [
        { _id: '1', name: 'Bread', price: 2.50, imageUrl: 'bread.png' },
        { _id: '2', name: 'Milk', price: 1.50, imageUrl: 'milk.png' },
        { _id: '3', name: 'Rice (1kg)', price: 3.00, imageUrl: 'rice.png' },
        { _id: '4', name: 'Paracetamol', price: 0.50, imageUrl: 'paracetamol.png' },
        { _id: '5', name: 'Fertilizer Seeds', price: 15.00, imageUrl: 'seeds.png' },
        { _id: '6', name: 'Soap', price: 1.00, imageUrl: 'soap.png' }
    ];

    const staticNews = [
        { headline: 'New Government Subsidy for Farmers Announced' },
        { headline: 'Local Health Camp Scheduled for Next Sunday' },
        { headline: 'Digital Literacy Program Launched in Nearby Village' }
    ];

    useEffect(() => {
        // Check if we're in production (GitHub Pages) or development
        const isProduction = window.location.hostname.includes('github.io');
        
        if (isProduction) {
            // Use static data for GitHub Pages deployment
            setServices(staticServices);
            setProducts(staticProducts);
            setFilteredProducts(staticProducts);
            setNews(staticNews);
        } else {
            // Use API calls for local development
            axios.get('/api/services')
                .then(res => setServices(res.data))
                .catch(err => {
                    console.log('API not available, using static data');
                    setServices(staticServices);
                });
            
            axios.get('/api/products')
                .then(res => {
                    setProducts(res.data);
                    setFilteredProducts(res.data);
                })
                .catch(err => {
                    console.log('API not available, using static data');
                    setProducts(staticProducts);
                    setFilteredProducts(staticProducts);
                });
            
            axios.get('/api/news')
                .then(res => setNews(res.data))
                .catch(err => {
                    console.log('API not available, using static data');
                    setNews(staticNews);
                });
        }
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
        const isProduction = window.location.hostname.includes('github.io');
        
        if (isProduction) {
            // For GitHub Pages deployment, show a demo message
            setFormMessage('Thank you for your message! (This is a demo - message not actually sent)');
            setContactForm({ name: '', message: '' });
        } else {
            // For local development, try to send to API
            try {
                const res = await axios.post('/api/contact', contactForm);
                setFormMessage(res.data.msg);
                setContactForm({ name: '', message: '' });
            } catch (error) {
                setFormMessage('Thank you for your message! (Demo mode - backend not available)');
                setContactForm({ name: '', message: '' });
            }
        }
    };

    const isProduction = window.location.hostname.includes('github.io');

    return (
        <div className="container">
            {isProduction && (
                <div style={{
                    background: '#e3f2fd',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    border: '1px solid #2196f3'
                }}>
                    <strong>🌟 Demo Mode:</strong> This is a live demo running on GitHub Pages. 
                    All functionality works with sample data. For full backend features, 
                    please run locally following the README instructions.
                </div>
            )}
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
