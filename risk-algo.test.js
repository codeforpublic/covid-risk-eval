const { riskEval } = require('./risk-eval');

const riskAlgo = {
  records: [
    {
      _id: 1,
      fever: 0,
      one_uri_symp: 0,
      travel_risk_country: 0,
      covid19_contact: 0,
      close_risk_country: 0,
      int_contact: 0,
      med_prof: 0,
      close_con: 0,
      risk_level: 1,
      gen_action: 'ล้างมือ สวมหน้ากาก หลีกเลี่ยงที่แออัด',
      spec_action: ' ',
    },
    {
      _id: 2,
      fever: 0,
      one_uri_symp: 0,
      travel_risk_country: 1,
      covid19_contact: 0,
      close_risk_country: 0,
      int_contact: 0,
      med_prof: 0,
      close_con: 0,
      risk_level: 3,
      gen_action: 'ล้างมือ สวมหน้ากาก หลีกเลี่ยงที่แออัด',
      spec_action:
        'เนื่องจากท่านมีประวัติเดินทางจากพื้นที่เสี่ยง ให้กักตัว 14 วัน พร้อมเฝ้าระวังอาการ ถ้ามีอาการไข้ ร่วมกับ อาการระบบทางเดินหายใจ ให้ติดต่อสถานพยาบาลทันที',
    },
    {
      _id: 3,
      fever: 0,
      one_uri_symp: 0,
      travel_risk_country: 0,
      covid19_contact: 1,
      close_risk_country: 0,
      int_contact: 0,
      med_prof: 0,
      close_con: 0,
      risk_level: 3,
      gen_action: 'ล้างมือ สวมหน้ากาก หลีกเลี่ยงที่แออัด',
      spec_action:
        'เนื่องจากท่านมีประวัติอยู่ใกล้ชิดผู้ป่วยยืนยันCOVID-19 ให้ติดต่อเจ้าหน้าที่ควบคุมโรค เพื่อประเมินความเสี่ยง',
    },
  ],
};
describe('RiskAlgo', () => {
  it('should find match record', () => {
    const result = riskEval(
      {
        fever: 0,
        one_uri_symp: 0,
        travel_risk_country: 0,
        covid19_contact: 1,
        close_risk_country: 0,
        int_contact: 0,
        med_prof: 0,
        close_con: 0,
      },
      { riskAlgo },
    );
    expect(result).toEqual({
      risk_level: 3,
      gen_action: 'ล้างมือ สวมหน้ากาก หลีกเลี่ยงที่แออัด',
      spec_action:
        'เนื่องจากท่านมีประวัติอยู่ใกล้ชิดผู้ป่วยยืนยันCOVID-19 ให้ติดต่อเจ้าหน้าที่ควบคุมโรค เพื่อประเมินความเสี่ยง',
    });
  });
  it('should find match record #2', () => {
    expect(
      riskEval(
        {
          fever: 0,
          one_uri_symp: 0,
          travel_risk_country: 1,
          covid19_contact: 0,
          close_risk_country: 0,
          int_contact: 0,
          med_prof: 0,
          close_con: 0,
        },
        { riskAlgo },
      ),
    ).toEqual({
      risk_level: 3,
      gen_action: 'ล้างมือ สวมหน้ากาก หลีกเลี่ยงที่แออัด',
      spec_action:
        'เนื่องจากท่านมีประวัติเดินทางจากพื้นที่เสี่ยง ให้กักตัว 14 วัน พร้อมเฝ้าระวังอาการ ถ้ามีอาการไข้ ร่วมกับ อาการระบบทางเดินหายใจ ให้ติดต่อสถานพยาบาลทันที',
    });
  });
});
