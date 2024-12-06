const { createTriggerUpdateTimestampTrigger } = require('../knex.utilities');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema
    .createTable('system_config', (table) => {
      table.uuid('id').primary().defaultTo(knex.fn.uuid());
      table.uuid('tenant').notNullable();
      table.foreign('tenant').references('tenant.id');
      table.uuid('theme').nullable();
      table.foreign('theme').references('theme.id');
      table.text('domain').notNullable();
      table.jsonb('assign_themes').nullable();
      table.timestamps(true, true);
      table.unique(['tenant']);
    })
    .raw(createTriggerUpdateTimestampTrigger('system_config'));

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('system_config');
