import {User} from './user'
import {Submission} from './submissions'

export interface Task {
  id: number
  name: string
  description: string
  status: string
  started_at: Date
  progress: number
  success: number
  deadline: Date
  responsibles: User[]
  submissions: Submission[]
}

export interface CreateTask {
  name: string
  description: string
  pages: string
}
