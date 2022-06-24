import { IngestUsecase } from './ingest'

class FsHandlerStub {
  exists (path: string): boolean {
    return true
  }
  read (path: string): string[] {
    return ['any_file.MXF', 'any_file.mp3', 'any_file.wav']
  }
}

const makeSut = () => {
  const fsHandlerStub = new FsHandlerStub()
  const sut = new IngestUsecase(fsHandlerStub)
  return {
    sut,
    fsHandlerStub
  }
}

const ingestData = {
  agenda: 'any_agenda',
  workstation: {
    name: 'any_name',
    path: 'any_path'
  },
  dateData: {
    day: 'any_day',
    month: 'any_month',
    monthName: 'any_month',
    year: 'any_year'
  },
  backup: true,
  backupDevice: {
    name: 'any_name',
    path: 'any_path'
  },
  mediaDriver: {
    name: 'any_name',
    path: 'any_path'
  }
}

describe('IngestUsecase', () => {
  test('should ensure mediaDriver exists', () => {
    const { sut, fsHandlerStub } = makeSut()
    const existsSpy = jest.spyOn(fsHandlerStub, 'exists')
    existsSpy.mockReturnValueOnce(false)
    const response = sut.exec(ingestData)
    expect(existsSpy).toBeCalledWith(ingestData.mediaDriver.path)
    expect(response).toEqual(new Error('Mídia não encontrada.'))
  })
  test('should read media for selected filetype', () => {
    const { sut } = makeSut()
    const filterFileTypesSpy = jest.spyOn(sut, 'filterFileTypes')
    const filesArray = ['any_file.MXF', 'any_file.mp3', 'any_file.wav']
    sut.exec(ingestData)
    expect(filterFileTypesSpy).toBeCalled()
    const filteredFilesArray = sut.filterFileTypes(filesArray)
    expect(filteredFilesArray).toEqual(['any_file.MXF', 'any_file.wav'])
  })
})
