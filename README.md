# covid-risk-eval
Evaluate risk by using [https://data.go.th/dataset/covid19](https://data.go.th/dataset/covid19)

## How to use
`risk-eval.js` and `risk-algo.json`

```js
const { riskEval } = require('./risk-eval.js')
const result = riskEval({
  fever: 0,
  one_uri_symp: 0,
  travel_risk_country: 1,
  covid19_contact: 0,
  close_risk_country: 0,
  int_contact: 0,
  med_prof: 0,
  close_con: 0,
})

console.log(result)
//  {
//  risk_level: 3,
//  gen_action: 'ล้างมือ สวมหน้ากาก หลีกเลี่ยงที่แออัด',
//  spec_action:
//        'เนื่องจากท่านมีประวัติเดินทางจากพื้นที่เสี่ยง ให้กักตัว 14 วัน พร้อมเฝ้าระวังอาการ ถ้ามีอาการไข้ ร่วมกับ อาการระบบทางเดินหายใจ ให้ติดต่อสถานพยาบาลทันที',
//  }
```
