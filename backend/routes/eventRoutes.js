// backend/routes/eventRoutes.js

import express from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//Get
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Fetch only events created by the logged-in user
    const events = await Event.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching user's events:", error);
    res.status(500).json({ message: 'Failed to fetch events: ' + error.message });
  }
});

// Get by id
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No event found with id: ${id}` });
  }

  try {
    // Ensure the user can only view their own event
    const event = await Event.findOne({ _id: id, userId: req.userId });

    if (!event) {
      return res.status(404).json({ message: 'Event not found or user not authorized.' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post
router.post('/', authMiddleware, async (req, res) => {
  if (!req.body.title || !req.body.date) {
    return res.status(400).json({ message: 'Title and Date are required fields.' });
  }

  const newEvent = new Event({
    ...req.body,
    userId: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(409).json({ message: error.message });
  }
});

//Delete
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No event found with id: ${id}` });
  }

  try {
    const result = await Event.findOneAndDelete({ _id: id, userId: req.userId });

    if (!result) {
      return res.status(404).json({ message: 'Event not found or user not authorized.' });
    }

    res.json({ message: 'Event deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update
router.patch('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No event found with id: ${id}` });
  }

  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { ...updateData, _id: id },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found or user not authorized.' });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export default router;
