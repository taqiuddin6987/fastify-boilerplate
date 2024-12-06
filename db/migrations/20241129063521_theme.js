const { createTriggerUpdateTimestampTrigger } = require('../knex.utilities');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema
    .createTable('theme', (table) => {
      table.uuid('id').primary().defaultTo(knex.fn.uuid());
      table.text('key').notNullable();
      table.jsonb('value').notNullable();
      table.timestamps(true, true);
      table.unique('key');
    })
    .raw(createTriggerUpdateTimestampTrigger('theme'));

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('theme');
