import { Cli } from './usecases/cli'
import { Readline } from './utils/readline'

const readline = new Readline()
const cli = new Cli(readline)
cli.init()
