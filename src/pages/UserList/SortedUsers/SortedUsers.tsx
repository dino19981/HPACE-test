import React, { useState } from 'react';
import { getUsersByName } from '../../../API/API';
import { Iuser } from '../../../types/types';
import styles from './sortedUser.module.scss';

type SortedUsers = {
  setSortedType: (state: string) => void;
  setUsers: (state: Iuser[]) => void;
};

export default function SortedUsers({ setSortedType, setUsers }: SortedUsers) {
  const [searchedName, setSearchedName] = useState('');

  async function handleFindName() {
    const newUsers = await getUsersByName(searchedName);
    setUsers(newUsers);
  }

  return (
    <div className={styles.sorted__wrapper}>
      <select name="" id="" onChange={(e) => setSortedType(e.target.value)} className="users__sort">
        <option value="">Сортировка по возрасту</option>
        <option value="top">По возрастанию</option>
        <option value="bottom">По убыванию</option>
      </select>
      <label htmlFor="sortedName">
        Сортировка по имени
        <input
          className={styles.sorted__input}
          onChange={(e) => setSearchedName(e.target.value)}
          type="text"
          name="sortedName"
        />
        <button className={styles.sorted__button} onClick={handleFindName}>
          Найти
        </button>
      </label>
    </div>
  );
}
