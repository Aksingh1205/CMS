import mongoose from 'mongoose';

const EntitySchema = new mongoose.Schema({
    entityName: {
        type: String,
        required: true,
        unique: true
    },
    attributes: [
        {
            name: { type: String, required: true },
            type: { type: String, required: true }
        }
    ],
    entries: [
        {
            type: mongoose.Schema.Types.Mixed
        }
    ]
});

const Entity = mongoose.model('Entity', EntitySchema);

export default Entity;
