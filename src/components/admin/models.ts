export type TextFields = {
  requirements: String,
  tasks: String
}

export interface Vacancy {
  id: String,
  location: String,
  title: String,
  category: String,
  time: String,
  text: String,
  requirements: Array<String>,
  tasks: Array<String>
}

const CategoryList = ['Backend', 'Frontend', 'Mobile', 'Design', 'Product Design']
export type Category = typeof CategoryList

export enum EThemes {
  BLACK = 'black',
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  GRAY = 'gray',
  WHITE = 'white',
  TRANSPARENT = 'transparent',
  GRAY_BLUE = 'gray-blue',
  WHITE_BLUE = 'white-blue',
  DEFRAMED = 'deframed',
  RAW = 'raw',
  DEFAULT = 'default',
}

export enum ESize {
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big',
  DEFAULT = 'default',
}