
import React, { createContext, useReducer, useEffect } from 'react';
import { ProductReducer } from './ProductReducer';  

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const initialState = {
    items: []
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (data && data.products) {
          dispatch({ type: 'SET_ITEMS', payload: data.products });
        } else {
          throw new Error('Data format is incorrect');
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const updateProduct = (updatedProduct) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
  };

  const deleteProduct = (id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  return (
    <ProductContext.Provider value={{ ...state, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
