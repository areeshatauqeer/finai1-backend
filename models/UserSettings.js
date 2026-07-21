const mongoose = require('mongoose');

const UserSettingsSchema = new mongoose.Schema({
  monthlyBudget: {
    type: Number,
    default: 1000,
  },
  budgetStartDate: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('UserSettings', UserSettingsSchema);