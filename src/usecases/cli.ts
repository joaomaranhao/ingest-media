import { Readline } from '../utils/readline'
import chalk from 'chalk'
import { Config } from '../interfaces/config'
import { Configuration } from './configuration'

export class Cli {
  private readline: Readline
  private configuration: Configuration
  private config: Config | undefined

  constructor (readline: Readline, configure: Configuration, config?: Config) {
    this.readline = readline
    this.configuration = configure
    this.config = config
  }

  init () {
    console.log(chalk.bgCyan('Ingest-media'))
    if (!this.config?.source || !this.config?.destinations) {
      console.log('You have to configure it first.')
      console.log('Source and workstation are required.')
      this.configureOptions()
    }
    if (this.config) {
      const option = this.readline.prompt(['Ingest', 'Config'], 'Choose an option:')
      if (!option) {
        console.log(chalk.bold.bgYellow('Cancelled.'))
      }
      if (option === 'Ingest') {
        console.log('Ingest')
      }
      if (option === 'Config') {
        this.configureOptions()
      }
    }
  }

  private configureOptions () {
    console.log(chalk.bgCyan('Configuration'))
    const option = this.readline.prompt(['Source', 'Workstations', 'Backup', 'Reset'], 'Choose an option:')
    if (!option) {
      console.log(chalk.bold.bgYellow('Cancelled.'))
    }
    if (option === 'Source') {
      this.sourceConfig()
    }
    if (option === 'Workstations') {
      console.log('Workstations')
    }
    if (option === 'Backup') {
      console.log('Backup')
    }
    if (option === 'Reset') {
      console.log('Reset')
    }
  }

  private sourceConfig () {
    console.log(chalk.bgCyan('Source Configuration'))
    const option = this.readline.prompt(['Add', 'Remove'], 'Choose an option:')
    if (!option) {
      console.log(chalk.bold.bgYellow('Cancelled.'))
    }
    if (option === 'Add') {
      const sourcePath = this.readline.question('What is the source path? -->  ')
      const normalizedPath = this.configuration.createNormalizedPath(sourcePath)
      console.log(normalizedPath)
    }
    if (option === 'Remove') {
      console.log('Remove')
    }
  }
}
