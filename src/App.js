import { useState } from "react";

const items = [
  {
    id: 1,
    type: "Shirt",
    image: "./cottontshirt.png",
    description: "Cotton T-shirt",
    quantity: 1,
    price: 44,
  },

  {
    id: 2,
    type: "Trousers",
    image: "./jeans.jpg",
    description: "Jeans",
    quantity: 1,
    price: 60,
  },

  {
    id: 3,
    type: "Shoes",
    image: "./vans.jpg",
    description: "Vans Old Skool",
    quantity: 1,
    price: 38,
  },
];

export default function App() {
  return (
    <div className="app-container">
      <ShoppingCart />
      <Checkout />
    </div>
  );
}

function ShoppingCart() {
  return (
    <div className="shopping-cart-container">
      <div className="header">
        <h1>Shopping Cart</h1>
        <span> {items.length} items</span>
      </div>
      <ul>
        {items.map((item) => (
          <PieceOfClothing item={item} key={item.id} />
        ))}
      </ul>
      <button id="checkout-btn">Checkout ➡</button>
    </div>
  );
}

function PieceOfClothing({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);

  const startingPrice = item.price;

  function handIncreaseleQuantity() {
    setQuantity((quantity) => quantity + 1);
    setPrice((price) => price + startingPrice);
  }

  function handleDecreaseQuantity() {
    setQuantity((q) => (q >= 2 ? q - 1 : q));
    setPrice((price) =>
      price > startingPrice ? price - startingPrice : startingPrice
    );
  }

  return (
    <>
      <li className="item-container">
        <img src={item.image} alt={item.description}></img>
        <div className="item-description">
          <span id="clothing-type">{item.type}</span>
          <span>{item.description}</span>
        </div>
        <div className="item-quantity">
          <button id="remove" onClick={handleDecreaseQuantity}>
            -
          </button>
          <span> {quantity} </span>
          <button id="add" onClick={handIncreaseleQuantity}>
            +
          </button>
        </div>
        <span id="price">€ {price}</span>
        <span id="delete">✖</span>
      </li>
    </>
  );
}

function Checkout() {
  return (
    <div className="checkout-container">
      <h2>Summary</h2>
      <div className="price-before-shipping">
        <span>ITEMS 3</span>
        <span>€ 132.00</span>
      </div>
      <div>
        <h3>SHIPPING</h3>
        <select>
          <option>Standard-Delivery-€5.00 (3-4 Days)</option>
          <option>Fast-Delivery-€8.00 (2-3 Days)</option>
          <option>Express-Delivery-€12.00 (1 Day)</option>
        </select>
      </div>
      <p className="final-price">TOTAL PRICE € 137.00</p>
      <button>CHECKOUT</button>
    </div>
  );
}
