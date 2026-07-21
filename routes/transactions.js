const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const UserSettings = require('../models/UserSettings');
const SavingsGoal = require('../models/SavingsGoal');

// ==========================================
// 1. BUDGET ROUTES
// ==========================================

// GET SAVED BUDGET
router.get('/budget', async (req, res) => {
  try {
    let settings = await UserSettings.findOne();
    if (!settings) {
      settings = await UserSettings.create({ monthlyBudget: 1000 });
    }
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE SAVED BUDGET WITH REFRESH DATE
router.post('/budget', async (req, res) => {
  try {
    const { monthlyBudget, budgetStartDate } = req.body;
    let settings = await UserSettings.findOne();
    
    if (!settings) {
      settings = new UserSettings({ 
        monthlyBudget, 
        budgetStartDate: budgetStartDate || new Date() 
      });
    } else {
      settings.monthlyBudget = monthlyBudget;
      if (budgetStartDate) {
        settings.budgetStartDate = budgetStartDate;
      }
    }

    await settings.save();
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. TRANSACTION ROUTES
// ==========================================

// GET ALL TRANSACTIONS (Fetch data)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD A NEW TRANSACTION (Create data)
router.post('/', async (req, res) => {
  try {
    const { title, amount, type, category } = req.body;
    
    const newTransaction = new Transaction({
      title,
      amount,
      type,
      category
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE A TRANSACTION BY ID
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await transaction.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Transaction removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. SAVINGS GOALS ROUTES
// ==========================================

// GET ALL GOALS
router.get('/goals', async (req, res) => {
  try {
    const goals = await SavingsGoal.find();
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE NEW GOAL
router.post('/goals', async (req, res) => {
  try {
    const { title, targetAmount } = req.body;
    const newGoal = new SavingsGoal({ title, targetAmount, currentAmount: 0 });
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADD FUNDS TO GOAL
router.put('/goals/:id/add-funds', async (req, res) => {
  try {
    const { amount } = req.body;
    const goal = await SavingsGoal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    goal.currentAmount += Number(amount);
    await goal.save();
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE GOAL BY ID
router.delete('/goals/:id', async (req, res) => {
  try {
    const goal = await SavingsGoal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    await goal.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;