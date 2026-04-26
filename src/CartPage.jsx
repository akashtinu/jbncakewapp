import React, { useEffect } from "react";
import { useCart } from "./CartContext";
import "./CartPage.css";

function CartPage({ onClose }) {
  const { cart, removeFromCart, updateWeight, updateItemDetails, clearCart, cartCount, cartTotal } = useCart();

  // Scroll to top when cart opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlaceOrder = () => {
    const message = cart.map(item => 
      `${item.name}\nWeight: ${item.weight}g\nPrice: ₹${(item.price * (item.weight / 500)).toFixed(2)}\nCelebration: ${item.celebration || 'N/A'}\nWhose Name: ${item.whoseName || 'N/A'}`
    ).join('\n\n') + `\n\nTotal: ₹${cartTotal.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/919787951525?text=${encodeURIComponent(message)}`;
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Place Order
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
