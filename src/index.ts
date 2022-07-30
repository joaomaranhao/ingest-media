import { Cli } from './usecases/cli'
import { Configuration } from './usecases/configuration'
import { Readline } from './utils/readline'

const readline = new Readline()
const configuration = new Configuration()
const cli = new Cli(readline, configuration)
cli.init()
