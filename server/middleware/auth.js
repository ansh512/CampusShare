const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();
app.use(cookieParser());

async function authenticateToken(req, res, next) {
  try {
    const token = req.cookies.jwt;
    console.log('Token:', token);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('Decoded token:', decoded);

    req.user = decoded.name;
    next();
  } catch (error) {
    console.log('Error:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
}


module.exports = authenticateToken;
