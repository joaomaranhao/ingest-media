import path from 'path'
import { Config, Destination } from '../interfaces/config'
import { FileSystemHandler } from '../utils/filesystem-handler'

export class Configuration {
  private filesystem: FileSystemHandler
  private configPath: string
  constructor (filesystem: FileSystemHandler) {
    this.filesystem = filesystem
    this.configPath = path.join('./config', 'config.json')
  }

  createDestination (title: string, fullPath: string): Destination {
    return {
      title,
      path: this.normalizedPath(fullPath)
    }
  }

  normalizedPath (fullPath: string): string {
    if (fullPath.includes('/')) {
      const normalizedPathArray = fullPath.split('/')
      return path.join(...normalizedPathArray)
    }
    if (fullPath.includes('\\')) {
      const normalizedPathArray = fullPath.split('\\')
      return path.join(...normalizedPathArray)
    }
    return fullPath
  }

  load (): Config {
    const buffer = this.filesystem.readFile(this.configPath)
    const data = JSON.parse(buffer)
    return data
  }

  save (data: Config | {}): void {
    const stringData = JSON.stringify(data)
    this.filesystem.writeFile(this.configPath, stringData)
  }
}
