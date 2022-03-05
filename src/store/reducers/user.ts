import React from 'react';
import { IuserAction, IuserState, userTypes } from '../../types/types';

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
