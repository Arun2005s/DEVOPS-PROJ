const Room = require('../models/Room');

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res) => {
  const { name, price, type, description, location, amenities, capacity, bedType, images } = req.body;

  try {
    const room = new Room({
      name,
      price,
      type,
      description,
      location,
      amenities,
      capacity,
      bedType,
      images,
    });

    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
  } catch (error) {
    console.error('Create room error:', error);
    res.status(400).json({ message: 'Invalid room data', error: error.message });
  }
};

// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
const updateRoom = async (req, res) => {
  const { name, price, type, description, location, amenities, capacity, bedType, images, status } = req.body;

  try {
    const room = await Room.findById(req.params.id);

    if (room) {
      room.name = name || room.name;
      room.price = price || room.price;
      room.type = type || room.type;
      room.description = description || room.description;
      room.location = location || room.location;
      room.amenities = amenities || room.amenities;
      room.capacity = capacity || room.capacity;
      room.bedType = bedType || room.bedType;
      room.images = images || room.images;
      room.status = status || room.status;

      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Update room error:', error);
    res.status(400).json({ message: 'Invalid room data', error: error.message });
  }
};

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (room) {
      await room.deleteOne();
      res.json({ message: 'Room removed' });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
