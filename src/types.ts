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

export type TextFields = {
  requirements: String,
  tasks: String
}

const CategoryList = ['Backend', 'Frontend', 'Mobile', 'Design', 'Product Design']
export type Category = typeof CategoryList


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