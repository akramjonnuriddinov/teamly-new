export interface UiManager {
  close: () => void
  addToList: (item: any) => void
  updateList: (data: any) => void
}

export type Vacancy = {
  id?: string | undefined
  title: string
  text: string
  location: string
  category: string
  time: string
  date: number
  description: object
}

export type Service = {
  id?: string | undefined
  title: string
  text: string
  category: string
  date: number
  image: string
}

export type Portfolio = {
  id: string
  title: string
  image: string
  text: string
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