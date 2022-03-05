import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
import styles from './userList.module.scss';
import User from '../../components/User/User';
import { getUsers } from '../../API/API';
import Preloader from '../../components/Preloader/Preloader';
import { getSortedUsers, getUsersPerPage } from '../../utils/utils';
import { Iuser, sortedTypes } from '../../types/types';
import SortedUsers from './SortedUsers/SortedUsers';

export default function UserList() {
  const [users, setUsers] = useState<Iuser[]>([]);
  const [pagination, setPagination] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortedType, setSortedType] = useState('');

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
      setIsLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!users.length) {
      return;
    }
    const sortedUsers = getSortedUsers(sortedType, users);
    setUsers(sortedUsers);
  }, [sortedType]);

  if (!isLoaded) {
    return <Preloader />;
  }

  return (
    <main className={styles.users}>
      <div className={styles.constainer}>
        <SortedUsers setUsers={setUsers} setSortedType={setSortedType} />
        <div className={styles.users__inner}>
          {getUsersPerPage(currentPage, pagination, users).map((user) => {
            return <User key={user.id} data={user} setUsers={setUsers} />;
          })}
        </div>
        <div className={styles.users__pagination}>
          <Pagination
            onChange={(page) => {
              setCurrentPage(page);
            }}
            defaultCurrent={1}
            pageSize={pagination}
            total={users.length}
          />
          <select
            name=""
            id=""
            onChange={(e) => setPagination(+e.target.value)}
            className={styles.users__pagination_choose}
          >
            <option value="100">All in one page</option>
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
          </select>
        </div>
      </div>
    </main>
  );
}
