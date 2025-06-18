const fs = require('fs');
const path = require('path');
const { isWithinInterval, parseISO } = require('date-fns');

const DATA_PATH = path.join(__dirname, '../data/prescriptions.json');

let _cache = null;
function loadAll() {
    if (!_cache) {
        const raw = fs.readFileSync(DATA_PATH, 'utf8');
        _cache = JSON.parse(raw);
    }
    return _cache;
}

/**
 * Apply optional search & date filters, then paginate,
 * and return both the page of data and meta-info.
 */
function generatePrescriptions({ page, limit, search, startDate, endDate }) {
    let records = loadAll();

    // search across medication, doctor, notes
    if (search) {
        const term = search.toLowerCase();
        records = records.filter(r =>
            r.medication.toLowerCase().includes(term) ||
            r.doctor.toLowerCase().includes(term) ||
            r.notes.toLowerCase().includes(term)
        );
    }

    // date filtering
    if (startDate || endDate) {
        const from = startDate ? parseISO(startDate) : new Date('1970-01-01');
        const to = endDate ? parseISO(endDate) : new Date();
        records = records.filter(r =>
            isWithinInterval(parseISO(r.issuedAt), { start: from, end: to })
        );
    }

    const totalRecords = records.length;
    const totalPages = Math.ceil(totalRecords / limit) || 1;
    const currentPage = Math.min(Math.max(page, 1), totalPages);

    const startIdx = (currentPage - 1) * limit;
    const data = records.slice(startIdx, startIdx + limit);

    return {
        data,
        meta: {
            totalRecords,
            totalPages,
            currentPage,
            pageSize: limit
        }
    };
}

module.exports = { generatePrescriptions };
