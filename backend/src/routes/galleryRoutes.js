const express = require('express');
const router = express.Router();
const { getGallery, uploadImages, deleteImage } = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.get('/', getGallery);
router.post('/upload', protect, admin, upload.array('images', 10), uploadImages);
router.delete('/:id', protect, admin, deleteImage);

module.exports = router;
