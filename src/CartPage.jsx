import React from "react";
import { useCart } from "./CartContext";
import "./CartPage.css";

function CartPage({ onClose }) {
  const { cart, removeFromCart, updateWeight, updateItemDetails, clearCart, cartCount, cartTotal } = useCart();

  const handlePlaceOrder = () => {
    const message = cart.map(item => 
      `${item.name}\nWeight: ${item.weight}g\nPrice: ₹${(item.price * (item.weight / 500)).toFixed(2)}\nCelebration: ${item.celebration || 'N/A'}\nWhose Name: ${item.whoseName || 'N/A'}`
    ).join('\n\n') + `\n\nTotal: ₹${cartTotal.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/9787951525?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  return (
    <section className="cart-page">
      <div className="cart-page-header">
        <div>
          <h2>Your Cart</h2>
          <p>{cartCount} item{cartCount === 1 ? "" : "s"} in cart</p>
        </div>
        <button className="close-cart-btn" type="button" onClick={onClose}>
          Continue shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">Your cart is empty. Add some cakes to see them here.</div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-content">
                  <h3>{item.name}</h3>
                  <p className="cart-item-weight">Weight: {item.weight}g</p>
                  <p className="cart-item-price">Price: ₹{(item.price * (item.weight / 500)).toFixed(2)}</p>
                  <div className="cart-item-controls">
                    <button type="button" onClick={() => updateWeight(item.id, -250)}>
                      -
                    </button>
                    <span>{item.weight}g</span>
                    <button type="button" onClick={() => updateWeight(item.id, 250)}>
                      +
                    </button>
                  </div>
                  <div className="cart-item-details">
                    <input
                      type="text"
                      placeholder="Celebration (e.g., Birthday)"
                      value={item.celebration}
                      onChange={(e) => updateItemDetails(item.id, { celebration: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Whose name"
                      value={item.whoseName}
                      onChange={(e) => updateItemDetails(item.id, { whoseName: e.target.value })}
                    />
                  </div>
                  <p className="cart-item-subtotal">Subtotal: ₹{(item.price * (item.weight / 500)).toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div>
              <p>Items:</p>
              <strong>{cartCount}</strong>
            </div>
            <div>
              <p>Total:</p>
              <strong>₹{cartTotal}</strong>
            </div>
          </div>

          <div className="cart-actions">
            <button className="place-order-btn" type="button" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
