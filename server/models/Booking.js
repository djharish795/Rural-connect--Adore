const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        quantity: Number 
    }],
    bookingDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', BookingSchema);
