const jwt = require('jsonwebtoken');
const Doctor = require('../models/registration');

process.env.JWT_SECRET = 'my-secret-key';

const doctorAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'Authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await Doctor.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!doctor) {
      throw new Error();
    }

    req.token = token;
    req.doctor = doctor;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Authorization denied' });
  }
};

module.exports = doctorAuthMiddleware;
