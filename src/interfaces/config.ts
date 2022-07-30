export type Destination = {
  title: string
  path: string
}

export interface Config {
  source: string | undefined
  destinations: Destination[] | undefined
  backup?: string
  [key: string]: string | undefined | Destination[]
}
