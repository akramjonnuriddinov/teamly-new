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

export const Statuses = {
  review: {
    status: 'review',
    definition: 'resume in review',
    color: 'yellow-400',
  },
  reject: {
    status: 'reject',
    definition: 'resume rejected',
    color: 'red-400',
  },
  accept: {
    status: 'accept',
    definition: 'resume accepted',
    color: 'green-400',
  },
  online: {
    status: 'online',
    definition: 'resume online',
    color: 'blue-400',
  },
  offline: {
    status: 'offline',
    definition: 'resume offline',
    color: 'red-800',
  },
  enhancement: {
    status: 'enhancement',
    definition: 'resume enhancement',
    color: '#a2eeef',
  },
}