const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Import Models
const User = require('../models/User');
const Service = require('../models/Service');
const Product = require('../models/Product');
const Contact = require('../models/Contact');
const Booking = require('../models/Booking');

// --- Static Data for Seeding/Display ---
const servicesData = [
    { name: 'Grocery Delivery', iconUrl: 'grocery.png' },
    { name: 'Medicine Supply', iconUrl: 'medicine.png' },
    { name: 'Bill Payments', iconUrl: 'bill.png' },
    { name: 'Agri-Support', iconUrl: 'agri.png' },
    { name: 'Health Checkup', iconUrl: 'health.png' }
];
const productsData = [
    { name: 'Bread', price: 2.50, imageUrl: 'bread.png' },
    { name: 'Milk', price: 1.50, imageUrl: 'milk.png' },
    { name: 'Rice (1kg)', price: 3.00, imageUrl: 'rice.png' },
    { name: 'Paracetamol', price: 0.50, imageUrl: 'paracetamol.png' },
    { name: 'Fertilizer Seeds', price: 15.00, imageUrl: 'seeds.png' },
    { name: 'Soap', price: 1.00, imageUrl: 'soap.png' }
];
const newsData = [
    { headline: 'New Government Subsidy for Farmers Announced' },
    { headline: 'Local Health Camp Scheduled for Next Sunday' },
    { headline: 'Digital Literacy Program Launched in Nearby Village' }
];

// --- API Endpoints ---

// POST /api/register - User registration
router.post('/register', async (req, res) => {
    const { username, email, password, phone } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });
        
        user = new User({ username, email, password, phone });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/login - User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, username: user.username, email: user.email, phone: user.phone } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/services - Fetch all services
router.get('/services', async (req, res) => {
    try {
        // Optional: Seed data if collection is empty
        const count = await Service.countDocuments();
        if (count === 0) await Service.insertMany(servicesData);
        
        const services = await Service.find();
        res.json(services);
    } catch (err) { res.status(500).send('Server Error'); }
});

// GET /api/products - Fetch all products
router.get('/products', async (req, res) => {
    try {
        // Optional: Seed data if collection is empty
        const count = await Product.countDocuments();
        if (count === 0) await Product.insertMany(productsData);

        const products = await Product.find();
        res.json(products);
    } catch (err) { res.status(500).send('Server Error'); }
});

// GET /api/news - Return static news headlines
router.get('/news', (req, res) => {
    res.json(newsData);
});

// POST /api/contact - Store contact form submission
router.post('/contact', async (req, res) => {
    try {
        const { name, message } = req.body;
        const newContact = new Contact({ name, message });
        await newContact.save();
        res.status(201).json({ msg: 'Message received. We will get back to you soon!' });
    } catch (err) { res.status(500).send('Server Error'); }
});

// POST /api/bookings - Create a booking (protected)
router.post('/bookings', auth, async (req, res) => {
    try {
        const { products } = req.body;
        const newBooking = new Booking({
            userId: req.user.id,
            products
        });
        const booking = await newBooking.save();
        res.status(201).json(booking);
    } catch (err) { res.status(500).send('Server Error'); }
});

// GET /api/bookings/:userId - Fetch bookings for a user (protected)
router.get('/bookings/:userId', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.userId) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        const bookings = await Booking.find({ userId: req.params.userId }).sort({ bookingDate: -1 });
        res.json(bookings);
    } catch (err) { res.status(500).send('Server Error'); }
});

// PUT /api/profile - Update user profile (protected)
router.put('/profile', auth, async (req, res) => {
    try {
        const { username, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { username, phone } },
            { new: true }
        ).select('-password');
        res.json(updatedUser);
    } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;
