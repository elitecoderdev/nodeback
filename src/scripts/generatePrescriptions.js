const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const { faker } = require('@faker-js/faker');

const COUNT = 1000;

function makePrescription() {
    return {
        id: uuid(),
        patientId: uuid(),
        medication: `${faker.commerce.productName()} ${faker.number.int({ min: 100, max: 1000 })}mg`,
        issuedAt: faker.date.past({ years: 1 }).toISOString().split('T')[0],
        doctor: `${faker.name.prefix()} ${faker.name.firstName()} ${faker.name.lastName()}`,
        notes: faker.lorem.sentence()
    };
}

const data = Array.from({ length: COUNT }, makePrescription);

const outDir = path.join(__dirname, '../data');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
    path.join(outDir, 'prescriptions.json'),
    JSON.stringify(data, null, 2)
);

console.log(`✅  Generated ${COUNT} prescriptions to src/data/prescriptions.json`);
