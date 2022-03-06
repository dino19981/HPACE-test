export interface Iuser {
  id: string,
  name: string,
  age: number,
  avatar: string,
  company: {
    name: string,
    date: string
  }
}

export interface IuserState {
  user: Iuser
}

export interface Iproduct {
  id: string,
  name: string,
  userId: string
}

export enum sortedTypes {
  top = 'top',
  bottom = 'bottom'
}

export interface IuserAction {
  type: string,
  payload: Iuser
}

export enum userTypes {
  UPLOAD_USER = 'UPLOAD_USER',
}

export type IuseUserList = [Iuser[], (state: Iuser[] | ((state: Iuser[]) => Iuser[])) => void, boolean]
