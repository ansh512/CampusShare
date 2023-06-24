require('dotenv').config({path: __dirname + "/.env"});
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const path = require("path");
const userModelPath = path.join(__dirname, "..","server", "userModels", "userModel1.js");
const User = require(userModelPath);

const sellRoute = require('./routes/sell');
const buyRoute = require('./routes/buy');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/sell', sellRoute);
app.use('/buy', buyRoute);

mongoose.connect("mongodb://localhost:27017/goodShareDB", { useNewUrlParser: true });

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.HOST_USERNAME,
    pass: process.env.HOST_PASSWORD
  }
});

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

function generateResetToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
}

app.post("/token", async (req, res) => {
  try {
    const reftoken = req.body.refresh_token;
    console.log("reftoken: ", reftoken);
    if (!reftoken) {
      return res.status(403).json({ message: "Unauthorized1" });
    }
    const user = jwt.verify(reftoken, process.env.REFRESH_TOKEN_SECRET);
    const check = await User.findOne({ email: user.name, 'refreshToken.token': reftoken });

    if (!check) {
      return res.status(403).json({ message: "Unauthorized2" });
    }
    const payload = {
      name: check.email,
    };

    const token = generateAccessToken(payload);
    res.cookie('jwt', token, { httpOnly: true, secure: true });
    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Invalid token" });
  }
});


app.post('/register', async (req, res) => {
  try {
    const { username, email, password,cpassword, phone } = req.body;
    console.log(req.body);
    const check = await User.findOne({email});
    if(check){
      res.status(404).json({message:"User already exists."})
    }
    if(password !== cpassword){
      res.send(404).json({message: "password and confirm password doesnot match."})
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({
      name: username,
      email: email,
      password: hashedPassword,
      phoneNumber: phone
    });
    
    await newUser.save();
    
    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = {
      name: foundUser.email,
    };

    const token = generateAccessToken(payload);
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{expiresIn: '1d'});
    foundUser.refreshToken = {
      token: refresh_token,
      expiresAt: Date.now() + (3600000*24)
    };
    await foundUser.save();
    res.cookie('jwt', token, { httpOnly: true, secure: true });
    res.status(200).json({ message: 'Successfully logged in',token:refresh_token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/forgotPassword', async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)
    
    // Check if the user exists with the given email
    const user = await User.findOne({ email });

    if (user) {
      // Generate a password reset token (you can use a library like crypto to generate a unique token)
      const resetToken = generateResetToken({userID:user._id});

      // Save the reset token and its expiration date to the user record in the database
      user.resetToken = {
        token: resetToken,
        expiresAt: Date.now() + 3600000, // Token expires in 1 hour
      };
      await user.save();

      // Send the password reset email
      const mailOptions = {
        from: 'anubhavbinit@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this email because you have requested a password reset. Click on the following link to reset your password: http://localhost:5000/forgotPassword/${resetToken}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ error: 'An error occurred while sending the email.' });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Password reset email sent successfully!' });
        }
      });
    } else {
      // User not found with the given email
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.get('/forgotPassword/:token', async (req, res) => {
  try {
    const form = `
    <form method="POST" action="/forgotPassword/$(req.params.token)">
      <label for="password">Enter Password:</label>
      <input type="password" id="password" name="password" required>
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required>
      <button type="submit">Reset Password</button>
    </form>
  `;
  res.send(form);
  }catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred in getting the form.' });
  }
});

app.put('/forgotPassword/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token)
    console.log(password)

    const updated_password = await bcrypt.hash(password, 10);

    // Update the user document with the specified reset token
    const updatedUser = await User.updateOne(
      { 'resetToken.token': token },
      { $set: { password: updated_password }, $unset: { resetToken: '' } }
    );

    if (updatedUser.n === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred while updating the password.' });
  }
});

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.listen(5000, () => {
    console.log("Server started on port 5000.");
  });