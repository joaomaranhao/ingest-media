export interface FsHandler {
  exists (path: string): boolean
  read (path: string): string[]
}
