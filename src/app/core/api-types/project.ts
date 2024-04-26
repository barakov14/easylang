import {User} from './user'

export interface Project {
  id: number
  name: string
  description: string
  status: string
  started_at: Date
  progress: number
  ended_at: Date
  number_of_chapters: number
  creators: User[]
  editors: User[]
  translators: User[]
}

export interface CreateProject {
  name: string
  description: string
  number_of_pages: number
}
