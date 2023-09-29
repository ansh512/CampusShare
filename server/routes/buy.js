const express = require('express');
const router = express.Router();
const path = require("path");
const itemModelPath = path.join(__dirname, "..", "userModels", "itemModel.js");
const Item = require(itemModelPath);
const authPath = path.join(__dirname, "..", "middleware","auth.js")
const auth = require(authPath);
const userModelPath = path.join(__dirname, "..", "userModels", "userModel1.js");
const User = require(userModelPath);
const bidModelPath = path.join(__dirname, "..", "userModels", "bidModel.js");
const Bid = require(bidModelPath);


router.get("/", async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    console.error("An error occurred while getting items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/bid", auth, async (req, res) => {
  try {
    const { itemID, amount, remark } = req.body;
    const userEmail = req.user; 
    const item = await Item.findOne({ _id: itemID });
    const bidCheck = await Bid.findOne({ $and: [{ itemID: itemID }, { user: req.user }] });
    console.log(item.user,req.user)
    if (item.user === req.user) {
      return res.status(403).json({ message: 'You cannot bid on your own product' });
    }

    if (bidCheck !== null) {
      await Bid.updateOne({ _id: bidCheck._id }, { amount: amount, remark: remark });
      return res.status(200).json({ message: 'Your bid was updated successfully!' });
    } else {
      const newBid = new Bid({
        user: userEmail,
        itemID: itemID,
        amount: amount,
        remark: remark,
        accepted: "pending"
      });
      await newBid.save();
    }

    return res.status(200).json({ message: 'Bid placed successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the bid.' });
  }
});


router.get("/history", auth, async (req, res) => {
  try {
    const bids = await Bid.find({ user: req.user });
    const tempItems = [];

    for (let i = 0; i < bids.length; i++) {
      const bid = bids[i];
      const item = await Item.findById(bid.itemID);

      const itemWithBid = {
        ...item.toObject(),
        offer: bid.amount,
        bidStatus:bid.accepted
      };

      tempItems.push(itemWithBid);
    }

    res.status(200).json(tempItems);
  } catch (error) {
    console.error("An error occurred while getting items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;