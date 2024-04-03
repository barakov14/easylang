export interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
  role: Role;
  rate: number;
  status: string;
}

export enum Role {
  manager = 'manager',
  translator = 'translator',
  editor = 'editor',
}
