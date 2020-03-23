const defaultRiskAlgo = require('./risk-algo.json');

const profileFields = [
  'fever',
  'one_uri_symp',
  'travel_risk_country',
  'covid19_contact',
  'close_risk_country',
  'int_contact',
  'med_prof',
  'close_con',
];

const riskEval = (data, { riskAlgo = defaultRiskAlgo } = {}) => {
  const { risk_level, gen_action, spec_action } = riskAlgo.records.find(record => {
    const sum = profileFields
      .map(key => {
        return data[key] === record[key] ? 1 : 0;
      })
      .reduce((sum, number) => {
        return sum + number;
      }, 0);
    return sum === profileFields.length;
  });
  return { risk_level, gen_action, spec_action };
};

module.exports.riskEval = riskEval;
