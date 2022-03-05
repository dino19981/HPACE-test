import React, { useState } from 'react';
import { changeUser } from '../../API/API';
import { Iuser } from '../../types/types';
import styles from './modal.module.scss';

type modal = {
  setModalActive: (state: boolean) => void;
  data: { name: string; age: number; userId: string };
  setUsers: (state: Iuser[] | ((state: Iuser[]) => Iuser[])) => void;
};

export default function Modal({ setModalActive, data, setUsers }: modal) {
  const [name, setName] = useState(data.name);
  const [age, setAge] = useState(data.age);

  function handleSaveChanges() {
    setModalActive(false);
    setUsers((prev) =>
      prev.map((item) => {
        if (item.name === data.name && item.age === data.age) {
          item.age = age;
          item.name = name;
        }
        return item;
      })
    );
    changeUser(name, age, data.userId);
  }

  return (
    <div className={styles.main__container}>
      <div className={styles.wrapper}>
        <div
          role="textbox"
          tabIndex={0}
          className={`${styles.modal} ${styles.active}`}
          onMouseDown={() => setModalActive(false)}
          onKeyPress={(e) => e.stopPropagation()}
        >
          <div
            role="textbox"
            tabIndex={0}
            className={`${styles.modal__content} ${styles.active}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={styles.modal__main}>
              <div className={styles.modal__input_wrapper}>
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(+e.target.value)}
                />
              </div>
              <div className={styles.modal__input_wrapper}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <button className={styles.modal__button} onClick={handleSaveChanges}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
