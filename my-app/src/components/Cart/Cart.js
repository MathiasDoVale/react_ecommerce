import React from 'react';

const Cart = ({ cartItems }) => {
  const total = cartItems && cartItems.data ? cartItems.data.reduce((total, item) => total + item.product.price, 0) : 0;

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems && cartItems.data ? cartItems.data.map((item, index) => (
        <div key={index}>
          <p>{item.product.brand} {item.product.model} {item.product.color} {item.cart_item_id.size}</p>
          <img src={"http://127.0.0.1:8000" + item.image.image} style={{maxWidth: '50px', height: 'auto'}}></img>
          <p>{item.product.price}</p>
        </div>
      )) : <div>No items in cart</div>}
      <h3>Total: {total}</h3>
      <button>Go to cart</button>
    </div>
  );
};

export default Cart;