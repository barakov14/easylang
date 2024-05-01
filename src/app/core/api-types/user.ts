export interface User {
  id: number
  name: string
  rate: number
  surname: string
  role: Role
  username: string
  status: string
  email: string
}

export enum Role {
  manager = 'manager',
  translator = 'translator',
  editor = 'editor',
  admin = 'admin',
}

export interface UpdateUser {
  name: string
  surname: string
  username: string
  password: string
  email: string
}

export interface UserDetail {
  id: number
  name: string
  rate: number
  surname: string
  role: Role
  username: string
  status: string
  place: number
  tasks_completed: number
  tasks_evaluated: number
  projects_created: number
  projects_completed: number
}
