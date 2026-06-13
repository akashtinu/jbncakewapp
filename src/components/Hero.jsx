export default function Hero({ onShopClick }) {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Handcrafted in Tiruppur</p>
        <h1 className="hero__title">
          Every Slice<br />
          <em>Tells a Story</em>
        </h1>
        <p className="hero__sub">
          Fresh-baked celebration cakes made with love. Order today, delivered tomorrow.
        </p>
        <button className="btn btn--primary" onClick={onShopClick}>
          Order Now
        </button>
      </div>
      <div className="hero__visual">
        <div className="hero__cake-anim">🎂</div>
        <div className="hero__ring hero__ring--1" />
        <div className="hero__ring hero__ring--2" />
      </div>
    </section>
  );
}
