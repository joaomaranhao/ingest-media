import { Agenda } from './agenda'

describe('Agenda', () => {
  test('should return correct data', () => {
    const sut = new Agenda(new Date('2022-05-20'))
    const agendaData = sut.create('any_title')
    expect(agendaData.dirName).toBe('20220520_ANY_TITLE')
    expect(agendaData.day).toBe('20')
    expect(agendaData.month).toBe('MAIO')
    expect(agendaData.year).toBe('2022')
  })
})
