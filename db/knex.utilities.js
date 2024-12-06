const createUpdateTimestampFunction = `
    CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$;
  `;

const dropUpdateTimestampFunction = `DROP FUNCTION IF EXISTS update_timestamp() CASCADE;`;

function createTriggerUpdateTimestampTrigger(tableName) {
  return `CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp()`;
}

function dropType(typeName) {
  return `DROP TYPE IF EXISTS ${typeName}`;
}

function generateSequenceName(names) {
  if (Array.isArray(names)) {
    return `${names.join('_')}_sequence`;
  }
  return `${names}_sequence`;
}

function createSequence(names) {
  const name = generateSequenceName(names);
  return `CREATE SEQUENCE ${name} START 1`;
}

function dropSequence(names) {
  const name = generateSequenceName(names);
  return `DROP SEQUENCE IF EXISTS ${name}`;
}

module.exports = {
  createUpdateTimestampFunction,
  dropUpdateTimestampFunction,
  createTriggerUpdateTimestampTrigger,
  dropType,
  generateSequenceName,
  createSequence,
  dropSequence,
};
