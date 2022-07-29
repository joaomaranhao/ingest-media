import { FileSystemHandler } from '../utils/filesystem-handler'

export class Ingest {
  private sourcePath: string
  private typesOfFiles: string[]
  private destination: string
  private fileSystemHandler: FileSystemHandler

  constructor (sourcePath: string, typesOfFiles: string[], destination: string, fileSystemHandler: FileSystemHandler) {
    this.sourcePath = sourcePath
    this.typesOfFiles = typesOfFiles
    this.destination = destination
    this.fileSystemHandler = fileSystemHandler
  }

  ingest (from: string, to: string, filesTypes: string[]) {
    const files = this.fileSystemHandler.readDir(from, filesTypes)
    this.fileSystemHandler.makeDir(to)
    this.fileSystemHandler.copyFiles(files, from, to)
  }
}
