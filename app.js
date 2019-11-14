let Ajv = require('ajv');
const axios = require('axios');
const fs = require('fs');
const glob = require('glob');

let questionnaire = require('./test_checkbox.json')

let ajv = new Ajv({
  meta: false, 
  extendRefs: true, 
  unknownFormats: 'ignore', 
  allErrors: true, 
  verbose: true,
  schemaId: 'auto'
});
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

glob("./schemas/**/*.json", function (er, schemas) {
  schemas.forEach((currentSchema) => {
    console.log(currentSchema);
    let data = fs.readFileSync(currentSchema);
    ajv.addSchema(JSON.parse(data));
  });

  var validate = ajv.compile(require('./schemas/questionnaire_v1.json'));
  let valid = validate(questionnaire);
  console.log(valid);
});