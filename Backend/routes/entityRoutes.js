import express from 'express';
import {
    createEntity,
    getEntity,
    createEntry,
    getEntries,
    updateEntry,
    deleteEntry,
  } from '../controllers/entityController.js';

const router = express.Router();

router.post('/entities', createEntity);
router.get('/entities/:entityName', getEntity);
router.post('/entities/:entityName/entries', createEntry);
router.get('/entities/:entityName/entries', getEntries);
router.put('/entities/:entityName/entries', updateEntry);
router.delete('/entities/:entityName/entries/:index', deleteEntry);

export default router;
