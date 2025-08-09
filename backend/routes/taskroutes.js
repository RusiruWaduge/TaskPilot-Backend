const express = require('express');
const router = express.Router();
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} = require('../controllers/taskcontroller');
const auth = require('../middleware/auth');

router.get('/', auth, getTasks);
router.post('/', auth, addTask);
router.put('/:id', auth, updateTask); 
router.delete('/:id', auth, deleteTask);


router.patch('/:id/toggle', auth, toggleTaskCompletion);

module.exports = router;
