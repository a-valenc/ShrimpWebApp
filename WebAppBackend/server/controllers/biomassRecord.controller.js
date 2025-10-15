import BiomassRecord from '../models/biomassRecord.model.js';

export const getBiomassRecords = async (req, res) => {
    try {
        const { ownerId } = req.query;
        let query = {};

        if (ownerId) {
            query.ownerId = ownerId;
        }

        const records = await BiomassRecord.find(query);
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching biomass records', error: error.message });
    }
};

export const getLatestBiomassRecord = async (req, res) => {
    try {
        const latest = await BiomassRecord.find().sort({ dateTime: -1 }).limit(1);
        res.json(latest[0] || {});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest biomass record' });
    }
};
