import React, { useState, useEffect } from 'react';
import { fetchItems, fetchCartItems } from '../../Api/apiService';
import './Catalog.css';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';

function Catalog({gender}) {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const items = await fetchItems(gender);
        setItems(items);
      } catch (error) {
        console.error('There was an error loading items of Catalog', error);
      }
    };
    getItems();
  }, [gender]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const cart_items = await fetchCartItems();
        setCartItems(cart_items);
        console.log(cart_items)
      } catch (error) {
        console.error('There was an error loading cart items', error);
      }
    };
    getCartItems();
  }, []);

  return (
    <div>
    <div className="grid-container">
      <div className="left-content" />
      <div className="left-content">
      </div>
      <div className="middle-content">
        <div className="card-container">
          {items.map((item, index) => (
            <Link to={`/${item.product.id}`} key={index}>
              <div className="card">
                <div className="card-content">
                  <img className="item-image" src={"http://127.0.0.1:8000" + item.image.image} alt="item home" />
                  <h2 className="brand-model">{item.product.brand} {item.product.model}</h2>
                  <p className="price">${item.product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="right-content">
        <div>
          <Cart cartItems={cartItems} />
        </div>
      </div>
      <div className="right-content" />
      <div className="right-content" />
    </div>

  </div>
  );
}

export default Catalog;