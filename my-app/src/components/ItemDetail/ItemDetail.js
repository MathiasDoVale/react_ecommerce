import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ItemDetail.css';

function ItemDetail() {
  let { id } = useParams();
  const [items, setItems] = useState([]);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [itemTitle, setItemTitle] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);

  useEffect(() => {
    const colors = items.flatMap(item => item.product.color);
    const unique = [...new Set(colors)];
    setUniqueColors(unique);
    if (selectedColor == null) {
      setSelectedColor(unique[0]);
    }
    if (setSelectedImage == null) {
      setSelectedColor(unique[0]);
    }
    const itemWithSelectedColor = items.find(item => item.product.color.includes(selectedColor) && item.images.length > 0);
    if (itemWithSelectedColor && itemWithSelectedColor.images[0].image) {
      setSelectedImage(itemWithSelectedColor.images[0].image);
    } else {
      setSelectedImage(null);
    }
  }, [items, selectedColor]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(response => {
        setItems(response.data.data);
        setItemTitle(response.data.data[0].product.brand + " " + response.data.data[0].product.model);
        setItemPrice('$' + response.data.data[0].product.price);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [id]);

  if (!items) {
    return <div>Item doesn't exist.</div>;
  }

  return (
    <div className="grid-container">
      <div className="left-content" />
      <div className="left-content">
      <p>Column 2</p>
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
                onClick={() => setSelectedColor(color)}
                alt="thumbnail"
                className={color === selectedColor ? 'selected-thumbnail thumbnail-image' : 'thumbnail-image '}
              />
            );
          })}
        </div>


        <div className="shoe-sizes">
          {items.map(item => (
            Array.from({length: 19}, (_, i) => (i * 0.5) + 4).filter(size => size <= 13.5).map(size => {
              const isSelectedSize = selectedColor === item.product.color && item.items_inventory.some(inventoryItem => inventoryItem.size === size.toString());
              return (
                <div 
                  key={size} 
                  className={`shoe-size ${isSelectedSize ? 'selected-size' : ''}`}
                  onClick={() => {
                    if (isSelectedSize) {
                      // Ejecuta la acción que quieras cuando se selecciona un tamaño
                    }
                  }}
                >
                  {size}
                </div>
              );
            })
          ))}
          {[14, 15].map(size => (
            items.map(item => {
              const isSelectedSize = selectedColor === item.product.color && item.items_inventory.some(inventoryItem => inventoryItem.size === size.toString());
              return (
                <div 
                  key={size} 
                  className={`shoe-size ${isSelectedSize ? 'selected-size' : ''}`}
                  onClick={() => {
                    if (isSelectedSize) {
                      // Ejecuta la acción que quieras cuando se selecciona un tamaño
                    }
                  }}
                >
                  {size}
                </div>
              );
            })
          ))}
        </div>

      </div>
      <div className="right-content" />
      <div className="right-content" />
    </div>
  );
}

export default ItemDetail;