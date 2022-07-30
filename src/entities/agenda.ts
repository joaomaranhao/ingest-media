import { AgendaData } from '../interfaces/agenda-data'

export class Agenda {
  private date: Date
  constructor (date: Date) {
    this.date = date
  }

  create (title: string): AgendaData {
    return {
      dirName: this.dirName(title),
      day: this.day(),
      month: this.month(),
      year: this.year()
    }
  }

  dirName (title: string): string {
    return `${this.year()}${this.date.toISOString().slice(5, 7)}${this.day()}_${title.toUpperCase()}`
  }

  day (): string {
    return this.date.toISOString().slice(8, 10)
  }

  month (): string {
    const months = [
      'janeiro', 'fevereiro', 'março', 'abril',
      'maio', 'junho', 'julho', 'agosto', 'setembro',
      'outubro', 'novembro', 'dezembro'
    ]
    return months[parseInt(this.date.toISOString().slice(5, 7)) - 1].toUpperCase()
  }

  year (): string {
    return this.date.toISOString().slice(0, 4)
  }
}
