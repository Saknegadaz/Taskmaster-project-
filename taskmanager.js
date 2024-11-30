const Task = require('../models/task');

exports.createTask = async (req, res) => {

    try {
        req.body.completed = req.body.completed == 'on';

        console.log(req.body);
        const task = new Task({ ...req.body, userId: req.user.id });
        await task.save();

        res.status(201).json({ ok: true, data: task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Additional endpoints for updating, deleting tasks can be added here.
