import path from 'path'
import { Destination } from '../interfaces/config'

export class Configure {
  createDestination (title: string, fullPath: string): Destination {
    return {
      title,
      path: this.createNormalizedPath(fullPath)
    }
  }

  createNormalizedPath (fullPath: string): string {
    const normalizedPathArray = fullPath.split('/')
    return path.join(...normalizedPathArray)
  }
}
