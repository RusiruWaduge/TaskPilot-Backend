const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        // Only allow dates >= start of today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value >= today;
      },
      message: 'Due date cannot be in the past',
    },
  },
  category: {
    type: String,
    enum: [
      'Work',
      'Personal',
      'Health',
      'Study',
      'Finance',
      'Errands',
      'Shopping',
      'Fitness',
      'Travel',
      'Project',
      'Meeting',
      'Others'
    ],
    default: 'Others',
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
