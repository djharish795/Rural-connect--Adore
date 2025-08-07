const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    iconUrl: { type: String, required: true }
});
module.exports = mongoose.model('Service', ServiceSchema);
