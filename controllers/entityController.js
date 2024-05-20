import Entity from '../models/entityModel.js';

export const createEntity = async (req, res) => {
    try {
        const { entityName, attributes } = req.body;
        const entity = new Entity({ entityName, attributes, entries: [] });
        await entity.save();
        res.json({ message: `Entity ${entityName} created successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getEntity = async (req, res) => {
    try {
      const { entityName } = req.params;
      const entity = await Entity.findOne({ entityName });
      if (!entity) return res.status(404).json({ error: 'Entity not found' });
      res.json(entity);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
export const createEntry = async (req, res) => {
    try {
        const { entityName } = req.params;
        const { entry } = req.body;
        const entity = await Entity.findOne({ entityName });
        if (!entity) return res.status(404).json({ error: 'Entity not found' });
        entity.entries.push(entry);
        await entity.save();
        res.json({ message: 'Entry created successfully', entry });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getEntries = async (req, res) => {
    try {
      const { entityName } = req.params;
      const entity = await Entity.findOne({ entityName });
      if (!entity) return res.status(404).json({ error: 'Entity not found' });
      res.json(entity.entries);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export const updateEntry = async (req, res) => {
    try {
        const { entityName } = req.params;
        const { index, updatedEntry } = req.body;

        // Find the entity by name
        const entity = await Entity.findOne({ entityName });
        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        // Check if the provided entry index is valid
        if (index < 0 || index >= entity.entries.length) {
            return res.status(400).json({ error: 'Invalid entry index' });
        }

        // Update the entry at the specified index
        entity.entries[index] = updatedEntry;
        await entity.save();

        // Send success response
        res.json({ message: 'Entry updated successfully' });
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
};

export const deleteEntry = async (req, res) => {
    try {
        const { entityName, index } = req.params; // Get the index of the entry to delete from request parameters

        const entity = await Entity.findOne({ entityName });
        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        if (index < 0 || index >= entity.entries.length) {
            return res.status(400).json({ error: 'Invalid entry index' });
        }

        // Remove the entry at the specified index
        entity.entries.splice(index, 1);
        await entity.save();

        res.json({ message: 'Entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

