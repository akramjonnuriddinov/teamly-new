export type TextFields = {
  requirements: String,
  tasks: String
}

export type Vacancy = {
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