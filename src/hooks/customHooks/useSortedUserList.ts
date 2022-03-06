import React, { useEffect, useState } from 'react'
import { Iuser } from '../../types/types'
import { getSortedUsers } from '../../utils/utils';

type useSortedUserList = (state: string) => void

export const useSortedUserList = (users: Iuser[], setUsers: (state: Iuser[]) => void): useSortedUserList => {
  const [sortedType, setSortedType] = useState('');

  useEffect(() => {
    if (!users.length) {
      return;
    }
    const sortedUsers = getSortedUsers(sortedType, users);
    setUsers(sortedUsers);
  }, [sortedType]);
  return setSortedType
}