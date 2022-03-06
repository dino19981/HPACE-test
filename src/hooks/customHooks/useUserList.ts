import React, { useEffect, useState } from 'react'
import { getUsers } from '../../API/API';
import { Iuser, IuseUserList } from '../../types/types';

export const useUserList = (): IuseUserList => {
  const [users, setUsers] = useState<Iuser[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
      setIsLoaded(true);
    })();
  }, []);
  return [users, setUsers, isLoaded]
}