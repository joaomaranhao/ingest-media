import { IFileSystemHandler } from '../interfaces/ifilesystem-handler'
import { Ingest } from './ingest'

describe('Ingest', () => {
  class FileSystemHandlerStub implements IFileSystemHandler {
    readDir (path: string, filesTypes: string[]): string[] {
      return ['any_array']
    }

    makeDir (path: string): void {}

    copyFiles (files: string[], from: string, to: string): void {}

    exists (path: string): boolean {
      return true
    }

    readFile (path: string): string {
      return 'any_string'
    }

    writeFile (file: string, data: string): void {}
  }

  const makeSut = (sourcePath: string, typesOfFiles: string[], destination: string, backup?: string | undefined) => {
    const fileSystemHandlerStub = new FileSystemHandlerStub()
    const sut = new Ingest(sourcePath, typesOfFiles, destination, fileSystemHandlerStub, backup)
    return {
      sut,
      fileSystemHandlerStub
    }
  }

  test('should call ingest one time if no backup is provided', () => {
    const sourcePath = 'any_path'
    const typesOfFiles = ['any', 'type']
    const destination = 'any_path'
    const { sut, fileSystemHandlerStub } = makeSut(sourcePath, typesOfFiles, destination)
    const readDirSpy = jest.spyOn(fileSystemHandlerStub, 'readDir')
    const makeDirSpy = jest.spyOn(fileSystemHandlerStub, 'makeDir')
    const copyFiles = jest.spyOn(fileSystemHandlerStub, 'copyFiles')
    sut.exec()
    expect(readDirSpy).toHaveBeenCalledTimes(1)
    expect(makeDirSpy).toHaveBeenCalledTimes(1)
    expect(copyFiles).toHaveBeenCalledTimes(1)
  })

  test('should call ingest two times if backup is provided', () => {
    const sourcePath = 'any_path'
    const typesOfFiles = ['any', 'type']
    const destination = 'any_path'
    const backup = 'any_path'
    const { sut, fileSystemHandlerStub } = makeSut(sourcePath, typesOfFiles, destination, backup)
    const readDirSpy = jest.spyOn(fileSystemHandlerStub, 'readDir')
    const makeDirSpy = jest.spyOn(fileSystemHandlerStub, 'makeDir')
    const copyFiles = jest.spyOn(fileSystemHandlerStub, 'copyFiles')
    sut.exec()
    expect(readDirSpy).toHaveBeenCalledTimes(2)
    expect(makeDirSpy).toHaveBeenCalledTimes(2)
    expect(copyFiles).toHaveBeenCalledTimes(2)
  })
})
