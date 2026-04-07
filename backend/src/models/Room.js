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
    enum: ['AC', 'Non-AC', 'Single', 'Double'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // Cloudinary URLs
  }],
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
