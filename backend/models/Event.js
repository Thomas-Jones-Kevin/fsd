// backend/models/Event.js

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  date: {
    type: Date,
    required: true,
  },

  tag: {
    type: String,
  },

  mood: {
    type: String,
  },

  photoUrl: {
    type: String,
  },

  isPublic: {
    type: Boolean,
    default: false,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Ensures every event belongs to a user
  },

  createdAt: {
    type: Date,
    default: new Date(), // Used for sorting and tracking
  },
});

export default mongoose.model("Event", eventSchema);
