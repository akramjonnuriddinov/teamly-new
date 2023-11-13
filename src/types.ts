export type Vacancy = {
  id?: string | undefined
  title: string
  text: string
  location: string
  category: string
  time: string
  date: number
  requirements: string[]
  tasks: string[]
}

export enum ESize {
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big',
  DEFAULT = 'default',
}

export enum EThemes {
  DEFAULT = 'default',
  GREEN = 'green',
  RED = 'red',
  WHITE = 'white',
}