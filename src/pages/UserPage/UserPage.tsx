import React, { useEffect, useState } from 'react';
import styles from './userPage.module.scss';
import User from '../../components/User/User';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { userTypes } from '../../store/reducers/user';
import { Iproduct } from '../../types/types';
import { deleteProduct, getProducts } from '../../API/API';
import Preloader from '../../components/Preloader/Preloader';
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const { user } = useTypedSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Iproduct>();
  const [showProduct, setShowProduct] = useState(true);
  const navigate = useNavigate();

  function handleDeleteProduct() {
    setProduct({ name: '', id: '', userId: '' });
    setShowProduct(false);
    deleteProduct(user.id);
  }

  function goMainMenu() {
    navigate('/');
  }

  useEffect(() => {
    (async () => {
      const product = await getProducts(user.id);
      if (product !== 'Not found') {
        setProduct(product);
      } else {
        setShowProduct(false);
      }
      setIsLoading(true);
    })();
  }, []);

  if (!isLoading) {
    return <Preloader />;
  }

  return (
    <div className={styles.user__wrapper}>
      <button className={styles.user__button} onClick={goMainMenu}>
        go back
      </button>
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
            Name: <span>{user.name}</span>
          </h4>
          <h4 className={styles.users__item_text}>{`Age: ${user.age}`}</h4>
          <h4>
            Company: <span>{user.company.name}</span>
          </h4>
          <h4>Products:</h4>
          {showProduct ? (
            <ul>
              <li>{product!.name}</li> <button onClick={handleDeleteProduct}>Delete product</button>
            </ul>
          ) : (
            <p>Нет продуктов</p>
          )}
        </div>
      </div>
    </div>
  );
}
