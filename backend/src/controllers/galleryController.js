const Gallery = require('../models/Gallery');
const mongoose = require('mongoose');

exports.getGallery = async (req, res) => {
  try {
    const { roomId } = req.query;
    const filter = roomId ? { roomId } : {};
    const images = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to access visual records.' });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    const { roomId, title, category } = req.body;
    
    console.log('[DEBUG] Upload Protocol Started');
    console.log('[DEBUG] Target Room:', roomId);
    
    if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: 'A valid Room ID is required for integration.' });
    }

    if (!req.files || req.files.length === 0) {
      console.error('[DEBUG] No files found in request');
      return res.status(400).json({ message: 'No assets provided.' });
    }

    const savedImages = [];
    
    for (const file of req.files) {
      console.log(`[DEBUG] Processing asset: ${file.originalname}`);
      
      const newImage = new Gallery({
        roomId,
        url: file.path || file.secure_url,
        public_id: file.filename || file.public_id,
        title: title || 'Hotel Asset',
        category: category || 'Architecture',
        author: req.user._id
      });
      
      const savedImage = await newImage.save();
      savedImages.push(savedImage);
    }

    res.status(201).json({
      message: `${savedImages.length} assets successfully integrated.`,
      images: savedImages
    });
  } catch (error) {
    console.error('--- UPLOAD CRITICAL FAILURE ---');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      message: 'Integration failure.', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Asset not found.' });

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Asset decommissioned.' });
  } catch (error) {
    res.status(500).json({ message: 'Decommissioning failure.' });
  }
};
