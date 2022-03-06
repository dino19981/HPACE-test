import React, { useEffect, useState } from 'react'
import { getProducts } from '../../API/API';
import { Iproduct } from '../../types/types';

type useProducts = [Iproduct | undefined, (state: Iproduct) => void, boolean, (state: boolean) => void, boolean]

export const useProducts = (userId: string): useProducts => {
  const [product, setProduct] = useState<Iproduct>();
  const [showProduct, setShowProduct] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const product = await getProducts(userId);
      if (product !== 'Not found') {
        setProduct(product);
      } else {
        setShowProduct(false);
      }
      setIsLoading(true);
    })();
  }, []);

  return [product, setProduct, showProduct, setShowProduct, isLoading]
}