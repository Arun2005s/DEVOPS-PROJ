const Booking = require('../models/Booking');
const Room = require('../models/Room');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { roomId, checkIn, checkOut, totalAmount } = req.body;

  try {
    const room = await Room.findById(roomId);

    if (room) {
      const booking = new Booking({
        userId: req.user._id,
        roomId,
        checkIn,
        checkOut,
        totalAmount,
      });

      const createdBooking = await booking.save();
      res.status(201).json(createdBooking);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid booking data' });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate('roomId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('userId', 'name email').populate('roomId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings };
