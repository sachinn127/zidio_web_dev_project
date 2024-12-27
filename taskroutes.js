const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  try {
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      user: req.userId
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, priority, dueDate, status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      priority,
      dueDate,
      status
    }, { new: true });

    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = route
