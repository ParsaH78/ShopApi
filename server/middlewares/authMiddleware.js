const jwt = require('jsonwebtoken');
import { db } from "../database.js";


const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let query = `SELECT first_name, last_name, email, username,
       address, postal_code, phone_number, city,
        image FROM users WHERE id = ?`;

      db.query(query, [decoded.id], (error, data) => {
        if (error) return res.status(500).json(error);
        req.user = data;
      })

      next()
    } catch (error) {
      return res.status(401).json({message : "not authorized"});
    }
  }

  if (!token) {
    return res.status(401).json({message: 'Not authorized, no token'});
  }
};

module.exports = { protect };
