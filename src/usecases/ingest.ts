import { FileSystemHandler } from '../utils/filesystem-handler'
import chalk from 'chalk'

export class Ingest {
  private sourcePath: string
  private typesOfFiles: string[]
  private destination: string
  private backup: string | undefined
  private fileSystemHandler: FileSystemHandler

  constructor (sourcePath: string, typesOfFiles: string[], destination: string, fileSystemHandler: FileSystemHandler, backup?: string) {
    this.sourcePath = sourcePath
    this.typesOfFiles = typesOfFiles
    this.destination = destination
    this.backup = backup
    this.fileSystemHandler = fileSystemHandler
  }

  exec () {
    const sourceExists = this.fileSystemHandler.exists(this.sourcePath)
    if (!sourceExists) {
      throw new Error('Source not found.')
    }
    if (this.backup) {
      console.log(chalk.bgGreen('Copying to backup...'))
      this.ingest(this.sourcePath, this.backup, this.typesOfFiles)
      console.log(chalk.bgGreen('Copying to destination...'))
      this.ingest(this.backup, this.destination, this.typesOfFiles)
      console.log(chalk.bgGreen('Finished!'))
    }
    if (!this.backup) {
      console.log(chalk.bgGreen('Copying to destination...'))
      this.ingest(this.sourcePath, this.destination, this.typesOfFiles)
      console.log(chalk.bgGreen('Finished!'))
    }
  }

  private ingest (from: string, to: string, filesTypes: string[]) {
    const files = this.fileSystemHandler.readDir(from, filesTypes)
    this.fileSystemHandler.makeDir(to)
    this.fileSystemHandler.copyFiles(files, from, to)
  }
}
