// server/models/Weather.js
const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true
  },
  temperature: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  windSpeed: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better query performance
WeatherSchema.index({ location: 1, date: -1 });

module.exports = mongoose.model('Weather', WeatherSchema);