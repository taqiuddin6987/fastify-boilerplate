/* eslint-disable no-console */

const chalk = require('chalk');
const knex = require('knex');
const path = require('path');
const config = require('../../knexfile.js');

const cliArguments = process.argv
  .slice(2)
  .reduce((previousValue, currentValue) => {
    const [key, value] = currentValue.split('=');
    previousValue[key.replaceAll('-', '')] = value;
    return previousValue;
  }, {});

if (!cliArguments.file) {
  console.error(
    chalk.red(`Error: file argument is required. eg: --file=example.js`)
  );
  process.exit(0);
}
const fileName = cliArguments.file;

async function runScript() {
  const module = await import(path.join('file://', __dirname, fileName));
  const knexConfig = config[process.env['NODE_ENV']];
  const client = knex(knexConfig);
  await module.script(client);
  console.log(chalk.green(`script run successfully`));
  process.exit(0);
}

runScript().catch((error) => {
  if (error.code === 'ERR_MODULE_NOT_FOUND') {
    console.error(chalk.red(`Error: file ${fileName} does not exist`));
    process.exit(0);
  }
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(0);
});
