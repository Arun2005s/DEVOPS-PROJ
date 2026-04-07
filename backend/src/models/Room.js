const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['AC', 'Non-AC', 'Single', 'Double', 'Suite', 'Deluxe'],
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: 'Main Wing',
  },
  amenities: {
    type: [String],
    default: ['WiFi', 'TV', 'AC'],
  },
  capacity: {
    type: Number,
    required: true,
    default: 2,
  },
  bedType: {
    type: String,
    required: true,
    default: 'Queen',
  },
  images: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available',
  },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
