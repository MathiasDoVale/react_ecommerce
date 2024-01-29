import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchCartItems } from '../../Api/apiService';
import Cart from '../Cart/Cart';
import { addItemToCart } from '../../Api/apiService';
import './ItemDetail.css';

function ItemDetail() {
  const firstUpdate = useRef(true);
  let { id } = useParams();
  let navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [productIdSelected, setProductIdSelected] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsChanged, setCartItemsChanged] = useState(false);
  const [itemTitle, setItemTitle] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);

  function buyClick() {
    addItemToCart(productIdSelected, selectedSize);
    setCartItemsChanged(true);
  }

  useEffect(() => {
    // Check if id is a number
    if (isNaN(id)) {
      // If id is not a number, navigate to home page
      navigate('/');
    }
    // Rest of your useEffect code...
  }, [id, navigate]);

  useEffect(() => {
    const colors = items.flatMap(item => item.product.color);
    const unique = [...new Set(colors)];
    setUniqueColors(unique);
    if (selectedColor == null) {
      setSelectedColor(unique[0]);
    }
    const itemWithSelectedColor = items.find(item => item.product.color.includes(selectedColor) && item.images.length > 0);
    if (itemWithSelectedColor && itemWithSelectedColor.images[0].image) {
      setSelectedImage(itemWithSelectedColor.images[0].image);
      setProductIdSelected(itemWithSelectedColor.product.id);
    } else {
      setSelectedImage(null);
      setProductIdSelected(null);
    }
  }, [items, selectedColor]);

  useEffect(() => {
    setSelectedSize(null); // Reset the selected size when the selected color changes
  }, [selectedColor]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(response => {
        setItems(response.data.data);
        setItemTitle(response.data.data[0].product.brand + " " + response.data.data[0].product.model);
        setItemPrice('$' + response.data.data[0].product.price);
      })
      .catch(error => {
        console.error('There was an error!', error);
        navigate('/');
        return;
      });
  }, [id, navigate]);

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
  
    if (firstUpdate.current) {
      getCartItems();
      firstUpdate.current = false;
      return;
    }
    
    if (cartItemsChanged) {
      getCartItems();
      setCartItemsChanged(false);
    }
  }, [cartItemsChanged]);

  if (!items) {
    return <div>Item doesn't exist.</div>;
  }

  return (
    <div className="grid-container">
      <div className="left-content" />
      <div className="left-content">
        <div>
          <Cart cartItems={cartItems} />
        </div>
      </div>
      <div className="middle-content">
        <div>
          {items.filter(item => item.product.color.includes(selectedColor)).map((item) => (
            <div key={item.product.id}>
              <img src={"http://127.0.0.1:8000" + selectedImage} alt="main" className="main-image" />
              <div className="thumbnail-images">
                {item.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={"http://127.0.0.1:8000" + image.image} 
                    alt="thumbnail" 
                    className={`thumbnail-image ${image.image === selectedImage ? 'selected-thumbnail' : ''}`} 
                    onClick={() => setSelectedImage(image.image)} 
                  />
                ))}
              </div>
            </div>
          ))}
          
        </div>
      </div>
      <div className="right-content">
        <div className="itemTitle">{itemTitle}</div>
        <div className="itemTitle">{selectedColor}</div>
        <div className="itemPrice">{itemPrice}</div>
        <div className="thumbnail-images-colors">
          {uniqueColors.map((color, index) => {
            const item = items.find(item => item.product.color === color);
            return (
              <img 
                key={index}
                src={"http://127.0.0.1:8000" + item.images[0].image}
                onClick={() => {
                  setSelectedColor(color)
                  setProductIdSelected(item.product.id)
                }}
                alt="thumbnail"
                className={color === selectedColor ? 'selected-thumbnail thumbnail-image' : 'thumbnail-image '}
              />
            );
          })}
        </div>
        <br />

        <div>
          <div className="shoe-sizes">
            {(() => {
              const sizes = Array.from({length: 23}, (_, i) => (i * 0.5) + 4).filter(size => size <= 13.5);
              return sizes.map(size => {
                const isSelectable = items.some(item => selectedColor === item.product.color && item.items_inventory.some(inventoryItem => inventoryItem.size === size.toString()));
                const isSelected = size === selectedSize;
                return (
                  <button 
                    key={size} 
                    className={`shoe-size ${isSelectable ? 'selected-size' : 'unclickable'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isSelectable) {
                        setSelectedSize(size);
                      }
                    }}
                  >
                    {size}
                  </button>
                );
              });
            })()}
          </div>



          <div className="shoe-sizes">
            {(() => {
              const sizes = [14, 15];
              return sizes.map(size => {
                const isSelectable = items.some(item => selectedColor === item.product.color && item.items_inventory.some(inventoryItem => inventoryItem.size === size.toString()));
                const isSelected = size === selectedSize;
                return (
                  <button 
                    key={size} 
                    className={`shoe-size ${isSelectable ? 'selected-size' : 'unclickable'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isSelectable) {
                        setSelectedSize(size);
                      }
                    }}
                  >
                    {size}
                  </button>
                );
              });
            })()}
          </div>
        </div>

        <div className="btn-container">
          <button className="btn-buy" onClick={buyClick} disabled={!selectedSize}>Buy</button>
        </div>

      </div>
      <div className="right-content" />
      <div className="right-content" />
    </div>
  );
}

export default ItemDetail;