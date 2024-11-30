const express = require('express');
const authMiddleware = require('../middleware/auth');
const { createTask, getTasks } = require('../controllers/taskmanager');

const router = express.Router();
router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);

module.exports = router;
