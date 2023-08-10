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
const bidModelPath = path.join(__dirname, "..", "userModels", "bidModel.js");
const Bid = require(bidModelPath);


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

    const newItem = new Item({
      user: req.user,
      title: title,
      description: description,
      price: price,
      images: images,
    });

    await newItem.save();

    res.status(200).json({ message: 'Item registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the item.' });
  }
});

router.get("/offers/:id", auth, async (req, res) => {
  try {
    const offer = await Bid.find({ itemID: req.params.id });

    res.status(200).json({ offer: offer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the items.' });
  }
});

router.get("/myListing", auth, async (req, res) => {
  try{

    const items = await Item.find({ user: req.user });
    res.status(200).json({ items: items});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the offers.' });
  }
})

router.post("/accept/:id", auth, async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, { accepted: true });
    await Sell.findByIdAndUpdate({ _id: bid.itemID }, { status: "sold" });
    res.status(200).json({ message: "Bid accepted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
