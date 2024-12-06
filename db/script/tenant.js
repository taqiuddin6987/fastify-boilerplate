const { input } = require('@inquirer/prompts');
const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.script = async function (knex) {
  const transaction = await knex.transaction();

  const tenantName = await input({ message: 'enter tenant name:  ' });
  if (!tenantName) {
    throw new Error('tenant name is required');
  }
  const tenantDomain = await input({ message: 'enter tenant domain:  ' });
  if (!tenantDomain) {
    throw new Error('tenant domain is required');
  }

  const officeEmail = await input({ message: 'enter office email:  ' });
  if (!officeEmail) {
    throw new Error('office email is required');
  }

  const userFirstName = await input({ message: 'enter user first name:  ' });
  if (!userFirstName) {
    throw new Error('first name is required');
  }
  const userLastName = await input({ message: 'enter user last name:  ' });
  if (!userLastName) {
    throw new Error('last name is required');
  }
  const userEmail = await input({ message: 'enter user email:  ' });
  if (!userEmail) {
    throw new Error('email is required');
  }
  const userPhone = await input({ message: 'enter user phone:  ' });
  if (!userPhone) {
    throw new Error('phone is required');
  }

  try {
    const theme = await transaction('theme').where({
      key: 'DEFAULT',
    });

    const [tenant] = await transaction('tenant')
      .insert({
        is_active: true,
        is_deleted: false,
      })
      .returning('*');

    await transaction('tenant_config')
      .insert({
        tenant: tenant.id,
        name: tenantName,
        email: officeEmail,
      })
      .returning('*');

    await transaction('system_config')
      .insert({
        tenant: tenant.id,
        domain: tenantDomain,
        theme: theme[0].id,
        assign_themes: JSON.stringify(theme),
      })
      .returning('*');

    await transaction('back_office_user')
      .insert({
        tenant: tenant.id,
        first_name: userFirstName,
        last_name: userLastName,
        password: bcrypt.hashSync('12345678', 12),
        email: userEmail,
        address: 'test road abc',
        phone: userPhone,
        user_type: 'SUPER_USER',
      })
      .returning('*');

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
