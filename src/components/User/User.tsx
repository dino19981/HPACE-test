import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../API/API';
import { Iuser, userTypes } from '../../types/types';
import Modal from '../Modal/Modal';
import styles from './user.module.scss';

type TUser = {
  data: Iuser;
  setUsers: (state: Iuser[] | ((state: Iuser[]) => Iuser[])) => void;
};

function User({ data, setUsers }: TUser) {
  const { name, age, avatar } = data;
  const [modalActive, setModalActive] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();

  function handleDeleteUser() {
    deleteUser(data.id);
    setUsers((prev) => prev.filter((item) => (item.id === data.id ? false : item)));
  }

  function handleName() {
    dispath({ type: userTypes.UPLOAD_USER, payload: data });
    navigate('/user');
  }

  return (
    <div className={styles.users__item}>
      <div className={styles.users__item_options}>
        <button className={styles.users__item_buttons} onClick={() => setModalActive(true)}>
          Change
        </button>
        <button className={styles.users__item_buttons} onClick={handleDeleteUser}>
          Delete
        </button>
      </div>
      <div className={styles.users__item_inner}>
        <div className="users__item-photo">
          <img
            className={styles.users__item_img}
            src="https://joeschmoe.io/api/v1/random"
            alt="User photo"
          />
        </div>
        <div className="users__item-descriptions">
          <h4 className={styles.users__item_text}>
            Name: <span onClick={handleName}>{name}</span>
          </h4>
          <h4 className={styles.users__item_text}>{`Age: ${age}`}</h4>
        </div>
      </div>
      {modalActive && (
        <Modal
          data={{ name: data.name, age: data.age, userId: data.id }}
          setUsers={setUsers}
          setModalActive={setModalActive}
        />
      )}
    </div>
  );
}

export default memo(User);
