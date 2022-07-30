import { Readline } from '../utils/readline'
import chalk from 'chalk'
import { Config } from '../interfaces/config'

export class Cli {
  private readline: Readline
  private config: Config | undefined

  constructor (readline: Readline, config?: Config) {
    this.readline = readline
    this.config = config
  }

  init () {
    console.log(chalk.bgCyan('Ingest-media'))
    if (!this.config?.source || !this.config?.destinations) {
      console.log('You have to configure it first.')
      console.log('Source and workstation are required.')
      this.configure()
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
        this.configure()
      }
    }
  }

  private configure () {
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
      console.log('Add')
    }
    if (option === 'Remove') {
      console.log('Remove')
    }
  }
}
