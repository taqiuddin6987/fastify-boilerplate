import camelCase from 'lodash/camelCase.js';
import isArray from 'lodash/isArray.js';
import isPlainObject from 'lodash/isPlainObject.js';
import snakeCase from 'lodash/snakeCase.js';

export function camelCaseKeys(object) {
  if (isArray(object)) return object.map(camelCaseKeys);
  if (!isPlainObject(object)) return object;
  const result = {};
  for (const key in object) {
    const newKey = camelCase(key);
    const value = object[key];
    if (isPlainObject(value)) {
      result[newKey] = camelCaseKeys(value);
    } else if (isArray(value)) {
      result[newKey] = value.map(camelCaseKeys);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

export function snakeCaseKeys(object) {
  if (isArray(object)) return object.map(snakeCaseKeys);
  if (!isPlainObject(object)) return object;
  const result = {};
  for (const key in object) {
    const newKey = snakeCase(key);
    const value = object[key];
    if (isPlainObject(value)) {
      result[newKey] = snakeCaseKeys(value);
    } else if (isArray(value)) {
      result[newKey] = value.map(snakeCaseKeys);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}
