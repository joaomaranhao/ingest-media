import { Readline } from '../utils/readline'
import chalk from 'chalk'
import { Config, Destination } from '../interfaces/config'
import { Configuration } from './configuration'

export class Cli {
  private readline: Readline
  private configuration: Configuration
  private config: Config

  constructor (readline: Readline, configuration: Configuration, config: Config) {
    this.readline = readline
    this.configuration = configuration
    this.config = config
  }

  init () {
    console.log(chalk.bgCyan('-- Ingest-media --'))
    if (this.config.source && this.config.destinations) {
      const option = this.readline.prompt(['Ingest', 'Config'], 'Choose an option:')
      if (!option) {
        console.log(chalk.bold.bgYellow('Cancelled.'))
      }
      if (option === 'Ingest') {
        console.log(chalk.bgCyan('-- Ingest --'))
      }
      if (option === 'Config') {
        this.configureOptions()
      }
    }
    if (!this.config.source || !this.config.destinations) {
      console.log('You have to configure it first.')
      console.log('Source and workstation are required.\n')
      this.configureOptions()
    }
  }

  private configureOptions () {
    console.log(chalk.bgCyan('-- Configuration --'))
    const option = this.readline.prompt(['Source', 'Workstations', 'Backup', 'Reset'], 'Choose an option:')
    if (!option) {
      console.log(chalk.bold.bgYellow('Cancelled.'))
    }
    if (option === 'Source') {
      this.setConfig('source')
    }
    if (option === 'Workstations') {
      this.setWorkstations()
    }
    if (option === 'Backup') {
      this.setConfig('backup')
    }
    if (option === 'Reset') {
      this.configuration.save({})
      console.log(chalk.bold.bgRed('Configuration reseted.'))
    }
  }

  private setConfig (configItem: string) {
    console.log(chalk.bgCyan(`-- ${this.capitalizeFirstLetter(configItem)} Configuration --`))
    if (this.config[configItem]) {
      console.log(`Your current ${configItem} path is --> ${this.config[configItem]}`)
    }
    const option = this.readline.prompt(['Add', 'Remove'], 'Choose an option:')
    if (!option) {
      console.log(chalk.bold.bgYellow('Cancelled.'))
    }
    if (option === 'Add') {
      const sourcePath = this.readline.question(`What is the ${configItem.toLowerCase()} path? -->  `)
      const normalizedPath = this.configuration.normalizedPath(sourcePath)
      this.config[configItem] = normalizedPath
      this.configuration.save(this.config)
      console.log(chalk.bold.bgGreen(`${this.capitalizeFirstLetter(configItem)} updated.\n`))
    }
    if (option === 'Remove') {
      this.config[configItem] = undefined
      this.configuration.save(this.config)
      console.log(chalk.bold.bgGreen(`${this.capitalizeFirstLetter(configItem)} updated.\n`))
    }
    this.init()
  }

  private setWorkstations () {
    console.log(chalk.bgCyan('-- Workstations Configuration --'))
    if (!this.config.destinations) {
      console.log('You do not have any workstation registered yet.')
    }
    if (this.config.destinations) {
      console.log('Your current registered workstations are: \n')
      for (const workstation of this.config.destinations) {
        console.log(`${workstation.title}`)
      }
    }
    const option = this.readline.prompt(['Add', 'Remove'], 'Choose an option:')
    if (!option) {
      console.log(chalk.bold.bgYellow('Cancelled.'))
    }
    if (option === 'Add') {
      const title = this.readline.question('What is the workstation title? -->  ')
      const path = this.readline.question('What is the workstation path? -->  ')
      const workstation: Destination = {
        title,
        path: this.configuration.normalizedPath(path)
      }
      if (!this.config.destinations) {
        this.config.destinations = []
      }
      this.config.destinations.push(workstation)
      this.configuration.save(this.config)
      console.log(chalk.bold.bgGreen('Workstation registered.\n'))
    }
    if (option === 'Remove') {
      if (!this.config.destinations) {
        console.log('You do not have any workstation registered yet.')
        this.setWorkstations()
      }
      if (this.config.destinations) {
        const titles = []
        for (const workstation of this.config.destinations) {
          titles.push(workstation.title)
        }
        const workstationTitle = this.readline.prompt(titles, 'Which workstation do you want to remove?')
        const workstationIndex = this.config.destinations.findIndex(workstation => {
          return workstation.title === workstationTitle
        })
        this.config.destinations.splice(workstationIndex, 1)
        if (this.config.destinations.length === 0) {
          this.config.destinations = undefined
        }
        this.configuration.save(this.config)
      }
      console.log(chalk.bold.bgGreen('Workstation updated.\n'))
    }
    this.init()
  }

  private capitalizeFirstLetter (word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
}
