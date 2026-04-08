const Gallery = require('../models/Gallery');

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
    
    if (!roomId) return res.status(400).json({ message: 'Room ID is required for integration.' });
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No assets provided.' });

    const savedImages = [];
    
    for (const file of req.files) {
      const newImage = new Gallery({
        roomId,
        url: file.path,
        public_id: file.filename,
        title: title || 'Hotel Asset',
        category: category || 'Architecture',
        author: req.user.id
      });
      const savedImage = await newImage.save();
      savedImages.push(savedImage);
    }

    res.status(201).json({
      message: `${savedImages.length} assets successfully integrated.`,
      images: savedImages
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Integration failure.' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Asset not found.' });

    // Note: Deleting from Cloudinary would require cloudinary.uploader.destroy(image.public_id)
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Asset decommissioned.' });
  } catch (error) {
    res.status(500).json({ message: 'Decommissioning failure.' });
  }
};
