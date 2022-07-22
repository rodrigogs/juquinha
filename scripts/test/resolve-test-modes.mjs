import inquirer from 'inquirer'

// eslint-disable-next-line no-process-env
export default async (environment = process.env) => {
  let { UNIT = false, INTEGRATION = false } = environment

  if (!UNIT && !INTEGRATION) {
    const { MODES } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'MODES',
        message: 'Which test modes would you like to use?',
        choices: [
          { name: 'Unit', value: 'unit' },
          { name: 'Integration', value: 'integration' },
        ],
      },
    ])

    UNIT = MODES.includes('unit')
    INTEGRATION = MODES.includes('integration')
  }

  return { UNIT, INTEGRATION }
}
