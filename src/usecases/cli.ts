import { Readline } from '../utils/readline'
import chalk from 'chalk'
import { Config } from '../interfaces/config'

export class Cli {
  private readline: Readline
  private config: Config | undefined

  constructor (readline: Readline, config: Config) {
    this.readline = readline
    this.config = config
  }

  init () {
    console.log(chalk.bgCyan('Ingest-media'))
    if (!this.config) {
      console.log('You have to configure it first.')
      this.configure()
    }
    if (this.config) {
      const initialOption = this.readline.prompt(['Ingest', 'Config'], 'Choose an option:')
      if (!initialOption) {
        console.log(chalk.bold.bgYellow('Cancelled.'))
      }
      if (initialOption === 'Ingest') {
        console.log('Ingest')
      }
      if (initialOption === 'Config') {
        this.configure()
      }
    }
  }

  private configure () {}
}
