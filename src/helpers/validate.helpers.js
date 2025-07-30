"use strict"

// dependecies
const jsonschema = require('jsonschema');

const validate = (schema, jsonObject) => {
  const validator = new jsonschema.Validator();
  let validatorResult = validator.validate(jsonObject, schema);

  return validatorResult;
};

module.exports = {
  validate
}