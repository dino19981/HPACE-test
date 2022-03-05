import React from 'react';
import { Iproduct, Iuser, IuserState } from '../../types/types';

export enum userTypes {
  UPLOAD_USER = 'UPLOAD_USER',
}

const initialProduct = {
  user: {
    id: '',
    name: '',
    age: 0,
    avatar: '',
    company: {
      name: '',
      date: '',
    },
  }

}

export interface IuserAction {
  type: string,
  payload: Iuser
}



function userReducer(state: IuserState = initialProduct, action: IuserAction): IuserState {
  switch (action.type) {
    case userTypes.UPLOAD_USER: {
      return { user: { ...action.payload } }
    }
    default:
      return state;
  }
}

export default userReducer;
