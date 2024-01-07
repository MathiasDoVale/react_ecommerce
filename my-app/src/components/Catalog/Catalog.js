import React, { useState, useEffect } from 'react';
import { fetchItems } from '../../Api/apiService';
import './Catalog.css';
import { Link } from 'react-router-dom';

function Catalog({gender}) {

  const [items, setItems] = useState([]);

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

  return (
    <div>
    <div className="grid-container">
      <div className="left-content" />
      <div className="left-content">
      <p>Column 2</p>
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
      <p>Column 3</p>
      </div>
      <div className="right-content" />
      <div className="right-content" />
    </div>

  </div>
  );
}

export default Catalog;