import path from 'path'
import { Readline } from '../utils/readline'
import chalk from 'chalk'
import { Config, Destination } from '../interfaces/config'
import { Configuration } from './configuration'
import { Agenda } from '../entities/agenda'
import { Ingest } from './ingest'
import { FileSystemHandler } from '../utils/filesystem-handler'

export class Cli {
  private readline: Readline
  private configuration: Configuration
  private config: Config
  private fileSystem: FileSystemHandler

  constructor (readline: Readline, configuration: Configuration, config: Config, fileSystem: FileSystemHandler) {
    this.readline = readline
    this.configuration = configuration
    this.config = config
    this.fileSystem = fileSystem
  }

  init () {
    console.log(chalk.bgCyan('\n-- Ingest-media --'))
    if (this.config.source && this.config.destinations && this.config.filesTypes) {
      const option = this.readline.prompt(['Ingest', 'Config'], 'Choose an option:')
      if (!option) {
        console.log(chalk.bgRed('Cancelled.'))
      }
      if (option === 'Ingest') {
        console.log(chalk.bgCyan('-- Ingest --'))
        const agendaTitle = this.readline.question('What is the agenda? --> ')
        console.log('\nWhat is the workstation?\n')
        const agenda = new Agenda(new Date()).create(agendaTitle)
        const workstationsTitles = []
        for (const workstation of this.config.destinations) {
          workstationsTitles.push(workstation.title)
        }
        const workstationTitle = this.readline.prompt(workstationsTitles, 'Select the workstation? --> ')
        if (!workstationTitle) {
          console.log(chalk.bgRed('Cancelled.'))
        }
        if (workstationTitle) {
          const selectedWorkstation = this.config.destinations.filter(workstation => {
            return workstation.title === workstationTitle
          })
          const fullDesinationPath = path.join(this.configuration.normalizedPath(selectedWorkstation[0].path), agenda.year, agenda.month, agenda.day, agenda.dirName)
          const fullBackupPath = this.config.backup ? path.join(this.config.backup, agenda.year, agenda.month, agenda.day, agenda.dirName) : undefined
          const ingest = new Ingest(this.config.source, this.config.filesTypes, fullDesinationPath, this.fileSystem, fullBackupPath)
          ingest.exec()
        }
      }
      if (option === 'Config') {
        this.configureOptions()
      }
    }
    if (!this.config.source || !this.config.destinations || !this.config.filesTypes) {
      console.log('You have to configure it first.')
      console.log('Source, workstation, and file type are required.\n')
      this.configureOptions()
    }
  }

  private configureOptions () {
    console.log(chalk.bgCyan('-- Configuration --'))
    const option = this.readline.prompt(['Source', 'Workstations', 'Files Types', 'Backup', 'Reset'], 'Choose an option:')
    if (!option) {
      console.log(chalk.bgRed('Cancelled.'))
    }
    if (option === 'Source') {
      this.setConfig('source')
    }
    if (option === 'Workstations') {
      this.setWorkstations()
    }
    if (option === 'Files Types') {
      this.setFilesTypes()
    }
    if (option === 'Backup') {
      this.setConfig('backup')
    }
    if (option === 'Reset') {
      this.configuration.save({})
      console.log(chalk.bgRed('Configuration reseted.'))
    }
  }

  private setConfig (configItem: string) {
    console.log(chalk.bgCyan(`-- ${this.capitalizeFirstLetter(configItem)} Configuration --`))
    if (this.config[configItem]) {
      console.log(`Your current ${configItem} path is --> ${this.config[configItem]}`)
    }
    const option = this.readline.prompt(['Add', 'Remove'], 'Choose an option:')
    if (!option) {
      console.log(chalk.bgRed('Cancelled.'))
    }
    if (option === 'Add') {
      const sourcePath = this.readline.question(`What is the ${configItem.toLowerCase()} path? -->  `)
      const normalizedPath = this.configuration.normalizedPath(sourcePath)
      this.config[configItem] = normalizedPath
      this.configuration.save(this.config)
      console.log(chalk.bgCyan(`${this.capitalizeFirstLetter(configItem)} updated.\n`))
    }
    if (option === 'Remove') {
      this.config[configItem] = undefined
      this.configuration.save(this.config)
      console.log(chalk.bgCyan(`${this.capitalizeFirstLetter(configItem)} updated.\n`))
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
      console.log(chalk.bgRed('Cancelled.'))
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
      console.log(chalk.bgCyan('Workstation registered.\n'))
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
      console.log(chalk.bgCyan('Workstation updated.\n'))
    }
    this.init()
  }

  private setFilesTypes () {
    console.log(chalk.bgCyan('-- Files Types Configuration --'))
    if (!this.config.filesTypes) {
      console.log('You do not have any filetype registered yet.')
    }
    if (this.config.filesTypes) {
      console.log('Your current registered files types are: \n')
      for (const filetype of this.config.filesTypes) {
        console.log(`${filetype}`)
      }
    }
    const option = this.readline.prompt(['Add', 'Remove'], 'Choose an option:')
    if (!option) {
      console.log(chalk.bgRed('Cancelled.'))
    }
    if (option === 'Add') {
      const type = this.readline.question('What is the file type? -->  ')
      if (!this.config.filesTypes) {
        this.config.filesTypes = []
      }
      this.config.filesTypes.push(type)
      this.configuration.save(this.config)
      console.log(chalk.bgCyan('File type registered.\n'))
    }
    if (option === 'Remove') {
      if (!this.config.filesTypes) {
        console.log('You do not have any file type registered yet.')
        this.setFilesTypes()
      }
      if (this.config.filesTypes) {
        const titles = []
        for (const type of this.config.filesTypes) {
          titles.push(type)
        }
        const fileType = this.readline.prompt(titles, 'Which file type do you want to remove?')
        const fileTypeIndex = this.config.filesTypes.findIndex(type => {
          return type === fileType
        })
        this.config.filesTypes.splice(fileTypeIndex, 1)
        if (this.config.filesTypes.length === 0) {
          this.config.filesTypes = undefined
        }
        this.configuration.save(this.config)
      }
      console.log(chalk.bgCyan('File type updated.\n'))
    }
    this.init()
  }

  private capitalizeFirstLetter (word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
}
