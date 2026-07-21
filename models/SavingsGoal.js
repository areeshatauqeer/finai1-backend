const mongoose = require('mongoose');

const SavingsGoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('SavingsGoal', SavingsGoalSchema);