const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Hotel Asset'
  },
  category: {
    type: String,
    default: 'Architecture'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gallery', gallerySchema);
