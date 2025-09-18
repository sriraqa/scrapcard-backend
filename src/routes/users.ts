
import express from 'express';
import { SCUser } from '../types';
const router = express.Router();

import { getUsersCollection } from '../db';
import { ObjectId } from 'mongodb';

// Create user
router.post('/', async (req, res) => {
    try {
        const user: SCUser = req.body;
        const users = getUsersCollection();
        await users.insertOne(user);

        res.status(201).send({
            message: 'User created', user
        });
    } catch (err) {
        console.error(err);

        res.status(400).send({
            error: 'Failed to create user'
        });
    }
});

// Update user
router.put('/', async (req, res) => {
    try {
        const { _id, ...update } = req.body as SCUser;
        const users = getUsersCollection();
        const result = await users.updateOne({ _id }, { $set: update });
        if (result.matchedCount === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'User updated', _id, update });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Failed to update user' });
    }
});

// Delete user
router.delete('/', async (req, res) => {
    try {
        const { _id } = req.body as SCUser;
        const users = getUsersCollection();
        const result = await users.deleteOne({ _id });
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'User deleted', _id });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Failed to delete user' });
    }
});

// Example: GET /user/:id
router.get('/user/:id', async (req, res) => {
    const users = getUsersCollection();
    const userId = req.params.id;
    const user = await users.findOne({ _id: new ObjectId(userId) });
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
});

export default router;