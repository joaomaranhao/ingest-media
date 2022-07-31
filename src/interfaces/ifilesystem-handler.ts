export interface IFileSystemHandler {
  readDir (path: string, filesTypes: string[]): string[]
  makeDir (path: string): void
  copyFiles (files: string[], from: string, to: string): void
  exists (path: string): boolean
  readFile (path: string): string
  writeFile (file: string, data: string): void
}
