const {
  createUpdateTimestampFunction,
  dropUpdateTimestampFunction,
} = require('../knex.utilities');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.raw(createUpdateTimestampFunction);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.raw(dropUpdateTimestampFunction);
};
