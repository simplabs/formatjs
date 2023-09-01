import {join} from 'path'
import {promisify} from 'util'
import {exec as nodeExec} from 'child_process'
const exec = promisify(nodeExec)

const BIN_PATH = require.resolve('@formatjs/cli/bin/formatjs')

test('hbs', async () => {
  const {stdout} = await exec(
    `${BIN_PATH} extract '${join(__dirname, '*.hbs')}'`
  )

  expect(JSON.parse(stdout)).toMatchSnapshot()
}, 20000)
