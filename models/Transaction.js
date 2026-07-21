const mongoose = require('mongoose');

// Define the structural rules for every transaction object
const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the transaction'],
      trim: true, // Automatically removes accidental extra spaces
    },
    amount: {
      type: Number,
      required: [true, 'Please add a transaction amount'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'], // Restricts value to only these two options
      required: [true, 'Please specify if this is income or expense'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      default: 'General',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);