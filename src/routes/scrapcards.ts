
import express from 'express';
import { ScrapCard } from '../types';
const router = express.Router();

import { getScrapCardCollection } from '../db';

// Create card
router.post('/', async (req, res) => {
    try {
        const scrapcard: ScrapCard = req.body;
        const scrapcards = getScrapCardCollection();
        await scrapcards.insertOne(scrapcard);

        res.status(201).send({
            message: 'Scrapcard created', scrapcard
        });
    } catch (err) {
        console.error(err);

        res.status(400).send({
            error: 'Failed to create Scrapcard'
        });
    }
});

// Update card
router.put('/', async (req, res) => {
    try {
        const { _id, ...update } = req.body as ScrapCard;
        const scrapcards = getScrapCardCollection();
        const result = await scrapcards.updateOne({ _id }, { $set: update });
        if (result.matchedCount === 0) {
            return res.status(404).send({ error: 'Scrapcard not found' });
        }
        res.send({ message: 'Scrapcard updated', _id, update });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Failed to update Scrapcard' });
    }
});

// Delete card
router.delete('/', async (req, res) => {
    try {
        const { _id } = req.body as ScrapCard;
        const users = getScrapCardCollection();
        const result = await users.deleteOne({ _id });
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Scrapcard not found' });
        }
        res.send({ message: 'Scrapcard deleted', _id });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Failed to delete Scrapcard' });
    }
});

export default router;