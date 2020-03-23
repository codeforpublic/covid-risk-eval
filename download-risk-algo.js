const axios = require('axios');
const fs = require('fs');
if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}

const run = async () => {
  let records = [];
  let fields = [];
  const resourceId = '1ef2152e-04f2-4341-919c-49217d6213f9';
  const limit = 80;
  let offset = 0;
  while (true) {
    console.log('[recordsCount]', records.length, '[fieldsCount]', fields.length);
    const response = await axios({
      method: 'GET',
      url: `https://opend.data.go.th/get-ckan/datastore_search?resource_id=${resourceId}&limit=${limit}&offset=${offset}`,
      headers: {
        'api-key': process.env.RISK_ALGO_API_KEY,
      },
    });
    const result = response.data.result;
    fields = result.fields;
    if (result.records.length === 0) {
      break;
    }
    records = [
      ...records,
      ...result.records.filter(
        newRecord => !records.filter(record => newRecord['_id'] === record['_id']).length > 0,
      ),
    ];
    offset += limit;
  }
  console.log('[recordsCount]', records.length, '[fieldsCount]', fields.length);
  const algo = { records, fields, updatedAt: new Date().toISOString(), resourceId };
  fs.writeFileSync('./risk-algo.json', JSON.stringify(algo, null, 2), 'utf8');
};

run();
