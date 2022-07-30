import fs from 'fs'
import path from 'path'

export class FileSystemHandler {
  readDir (path: string, filesTypes: string[]): string[] {
    const files = fs.readdirSync(path, { encoding: 'utf-8' })
    const filteredFiles = []
    for (const type of filesTypes) {
      const filesByType = files.filter(file => {
        return file.toLowerCase().includes(type.toLowerCase())
      })
      filteredFiles.push(...filesByType)
    }
    return filteredFiles
  }

  makeDir (path: string): void {
    fs.mkdirSync(path, { recursive: true })
  }

  copyFiles (files: string[], from: string, to: string): void {
    for (const file of files) {
      const sourceFilePath = path.join(from, file)
      const destinationFilePath = path.join(to, file)
      fs.copyFileSync(sourceFilePath, destinationFilePath)
    }
  }

  exists (path: string): boolean {
    return fs.existsSync(path)
  }

  readFile (path: string) {
    return fs.readFileSync(path, { encoding: 'utf8' })
  }

  writeFile (file: string, data: string): void {
    fs.writeFileSync(file, data)
  }
}
