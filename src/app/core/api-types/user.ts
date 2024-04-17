export interface User {
  id: number;
  name: string;
  rate: number;
  surname: string;
  role: Role;
  username: string;
  status: string;
}

export enum Role {
  manager = 'manager',
  translator = 'translator',
  editor = 'editor',
}
