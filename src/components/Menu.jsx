import { forwardRef } from "react";
import CakeCard from "./CakeCard";
import { cakes } from "../data/cakes";

const Menu = forwardRef(function Menu({ onAdd }, ref) {
  return (
    <section className="menu" ref={ref} id="menu">
      <div className="menu__header">
        <p className="menu__eyebrow">Our Specialties</p>
        <h2 className="menu__title">Pick Your Perfect Cake</h2>
      </div>
      <div className="menu__grid">
        {cakes.map((cake) => (
          <CakeCard key={cake.id} cake={cake} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
});

export default Menu;
