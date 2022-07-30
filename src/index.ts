import { Cli } from './usecases/cli'
import { Configuration } from './usecases/configuration'
import { FileSystemHandler } from './utils/filesystem-handler'
import { Readline } from './utils/readline'

const readline = new Readline()
const fileSystem = new FileSystemHandler()
const configuration = new Configuration(fileSystem)
const configOptions = configuration.load()
const cli = new Cli(readline, configuration, configOptions, fileSystem)
cli.init()
