export type Destination = {
  title: string
  path: string
}

export interface Config {
  source: string
  destinations: Destination[]
  backup?: string
}
