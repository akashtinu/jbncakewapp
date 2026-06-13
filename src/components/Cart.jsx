import { useState } from "react";

const RAZORPAY_KEY_ID = "rzp_live_T0yjUz8vExC22P";

export default function Cart({ cart, onClose, onRemove, onUpdateQty }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (!form.address.trim()) e.address = "Delivery address is required";
    return e;
  };

  const handlePay = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setPaying(true);
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: total * 100, // paise
      currency: "INR",
      name: "Sweetly Yours",
      description: `Cake Order — ${cart.length} item(s)`,
      image: "https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/72x72/1f382.png",
      handler: function (response) {
        setPaying(false);
        alert(
          `🎉 Order placed successfully!\n\nPayment ID: ${response.razorpay_payment_id}\n\nThank you, ${form.name}! Your cake is on its way.`
        );
        onClose();
      },
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      notes: {
        delivery_address: form.address,
      },
      theme: { color: "#b5615a" },
      modal: {
        ondismiss: () => setPaying(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (resp) {
      setPaying(false);
      alert("Payment failed: " + resp.error.description);
    });
    rzp.open();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
          <div className="cart-panel__header">
            <h2>Your Order</h2>
            <button className="cart-panel__close" onClick={onClose}>✕</button>
          </div>
          <div className="cart-empty">
            <span className="cart-empty__icon">🛒</span>
            <p>Your cart is empty</p>
            <button className="btn btn--primary" onClick={onClose}>Browse Cakes</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-panel__header">
          <h2>Your Order</h2>
          <button className="cart-panel__close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-panel__items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="cart-item__emoji">{item.emoji}</span>
              <div className="cart-item__info">
                <p className="cart-item__name">{item.name}</p>
                <p className="cart-item__price">₹{item.price} each</p>
              </div>
              <div className="cart-item__qty">
                <button onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <span className="cart-item__subtotal">₹{item.price * item.qty}</span>
              <button className="cart-item__remove" onClick={() => onRemove(item.id)}>🗑</button>
            </div>
          ))}
        </div>

        <div className="cart-panel__total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <div className="cart-form">
          <h3>Delivery Details</h3>
          <div className="cart-form__field">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Priya Sharma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="cart-form__error">{errors.name}</span>}
          </div>
          <div className="cart-form__field">
            <label>Mobile Number</label>
            <input
              type="tel"
              placeholder="9876543210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {errors.phone && <span className="cart-form__error">{errors.phone}</span>}
          </div>
          <div className="cart-form__field">
            <label>Delivery Address</label>
            <textarea
              placeholder="House no, Street, Tiruppur..."
              rows={3}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            {errors.address && <span className="cart-form__error">{errors.address}</span>}
          </div>
        </div>

        <button
          className="btn btn--pay"
          onClick={handlePay}
          disabled={paying}
        >
          {paying ? "Opening Payment…" : `Pay ₹${total} with Razorpay`}
        </button>
      </div>
    </div>
  );
}
