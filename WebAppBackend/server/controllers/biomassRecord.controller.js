import BiomassRecord from '../models/biomassRecord.model.js';

export const getBiomassRecords = async (req, res) => {
    try {
        const records = await BiomassRecord.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching biomass records' });
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

export const deleteBiomassRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await BiomassRecord.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Biomass record not found' });
        }
        res.json({ message: 'Biomass record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting biomass record' });
    }
};
