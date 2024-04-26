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
