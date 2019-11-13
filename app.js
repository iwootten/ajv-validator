let Ajv = require('ajv');
let schema = require('./schemas/questionnaire_v1.json');

let questionnaire = require('./test_checkbox.json')

let ajv = new Ajv({meta: false, extendRefs: true, unknownFormats: 'ignore', verbose: true});

var metaSchema = require('./node_modules/ajv/lib/refs/json-schema-draft-04.json');
ajv.addMetaSchema(metaSchema);
ajv._opts.defaultMeta = metaSchema.id;

let valid = ajv.validate(schema, questionnaire);

if (valid) {
    console.log('User data is valid');
} else {
    console.log('User data is INVALID!');
    console.log(ajv.errors);
}