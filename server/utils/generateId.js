const Counter = require('../models/Counter');

const generateId = async (prefix) => {
  const counter = await Counter.findOneAndUpdate(
    { name: prefix },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `${prefix}-${counter.seq}`;
};

module.exports = { generateId };
