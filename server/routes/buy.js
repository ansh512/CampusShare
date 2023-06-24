const express = require('express');
const router = express.Router();
const path = require("path");
const itemModelPath = path.join(__dirname, "..", "userModels", "itemModel.js");
const Item = require(itemModelPath);
const authPath = path.join(__dirname, "..", "middleware","auth.js")
const auth = require(authPath);
const userModelPath = path.join(__dirname, "..", "userModels", "userModel1.js");
const User = require(userModelPath);


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
    // console.log(req.body);
    const { itemID, amount, remark } = req.body;
    const userEmail = req.user; 

    const newBid = {
      itemID: itemID,
      amount: amount,
      remark: remark,
      accepted: "pending"
    };

    const user = await User.findOne({email:req.user});
    if(user){
      user.bid = [newBid];
      await user.save();
      console.log('Bid updated successfully!');
    } 
    return res.status(200).json({ message: 'Bid updated successfully!' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'An error occurred while updating the bid.' });
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });
    let tempItem = [];

    for (let i = 0; i < user.bid.length; i++) {
      const bidItem = await Item.findById(user.bid[i].itemID);
      tempItem.push(bidItem);
    }
    res.status(200).json(tempItem);
  } catch (error) {
    console.error("An error occurred while getting items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;