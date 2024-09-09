import React from 'react';

const CartModal = ({ cartItems, removeFromCart, closeCart, checkout }) => {
  return (
    <div className="cart-modal">
      <button onClick={closeCart}>Close</button>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={checkout} disabled={cartItems.length === 0}>
        Checkout
      </button>
    </div>
  );
};

export default CartModal;
