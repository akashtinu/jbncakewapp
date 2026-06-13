export default function CakeCard({ cake, onAdd }) {
  return (
    <div className="cake-card">
      <div className="cake-card__emoji-wrap">
        <img src={cake.img} alt={cake.name} className="cake-card__image" />
      </div>
      {cake.tag && <span className="cake-card__tag">{cake.tag}</span>}
      <div className="cake-card__body">
        <h3 className="cake-card__name">{cake.name}</h3>
        <p className="cake-card__desc">{cake.description}</p>
        <div className="cake-card__meta">
          <span className="cake-card__weight">{cake.weight}</span>
          <span className="cake-card__price">₹{cake.price}</span>
        </div>
        <button
          className="btn btn--add"
          onClick={() => onAdd(cake)}
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}
