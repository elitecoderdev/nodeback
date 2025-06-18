const { generatePrescriptions } = require('../services/prescriptionService');

async function getPrescriptions(req, res) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const { search, startDate, endDate } = req.query;

        const { data, meta } = generatePrescriptions({
            page, limit, search, startDate, endDate
        });

        res.json({ data, meta });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getPrescriptions };
