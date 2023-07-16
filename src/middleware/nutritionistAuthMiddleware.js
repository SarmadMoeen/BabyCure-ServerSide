const jwt = require('jsonwebtoken');
const Nutritionist = require('../models/nutritionistRegistration');

process.env.JWT_SECRET = 'my-secret-key';

const nutritionistAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'Authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const nutritionist = await Nutritionist.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!nutritionist) {
      throw new Error();
    }

    req.token = token;
    req.nutritionist = nutritionist;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Authorization denied' });
  }
};

module.exports = nutritionistAuthMiddleware;
