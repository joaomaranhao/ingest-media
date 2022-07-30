import rl from 'readline-sync'

export class Readline {
  question (query: string): string {
    return rl.question(query)
  }

  prompt (options: string[], query: string): string {
    const index = rl.keyInSelect(options, query)
    return options[index]
  }
}
