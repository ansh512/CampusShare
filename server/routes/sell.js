const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const itemModelPath = path.join(__dirname, '..', 'userModels', 'itemModel.js');
const Item = require(itemModelPath);
const userModelPath = path.join(__dirname, '..', 'userModels', 'userModel1.js');
const User = require(userModelPath);
const auth = require('./../middleware/auth.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueFilename = uuidv4();
    const fileExtension = path.extname(file.originalname); // Get the file extension
    const fileName = uniqueFilename + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const images = req.files.map((file) => file.filename);
    console.log(images);

    const newItem = new Item({
      user: req.user,
      title: title,
      description: description,
      price: price,
      images: images,
    });

    await newItem.save(); // Save the newItem document

    res.status(200).json({ message: 'Item registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the item.' });
  }
});

router.get("/myListing", auth, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user });

    for (let i = 0; i < items.length; i++) {
      const bids = await User.find({ "bid.itemID": items[i]._id });
      console.log(bids[0]);
      if (bids.length > 0) {
        items[i]["bid"] = bids;
      }
    }
    
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the item.' });
  }
});

module.exports = router;
