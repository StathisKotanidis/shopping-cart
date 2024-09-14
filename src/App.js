import { useState } from "react";

const itemsArr = [
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
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  const [items, setItems] = useState(itemsArr);
  const updateQuantity = (id, delta) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app-container">
      <ShoppingCart
        onToggle={handleToggle}
        items={items}
        updateQuantity={updateQuantity}
        onDelete={handleDelete}
      />
      <Checkout
        toggle={toggle}
        onToggle={handleToggle}
        totalPrice={totalPrice}
      />
    </div>
  );
}

function ShoppingCart({ onToggle, items, updateQuantity, onDelete }) {
  return (
    <div className="shopping-cart-container">
      <div className="header">
        <h1>Shopping Cart</h1>
        <span> {items.length} items</span>
      </div>
      <ul>
        {items.map((item) => (
          <PieceOfClothing
            item={item}
            key={item.id}
            onIncrease={() => updateQuantity(item.id, 1)}
            onDecrease={() => updateQuantity(item.id, -1)}
            onDelete={onDelete}
          />
        ))}
      </ul>
      <Button onClick={onToggle}>Checkout ➡</Button>
    </div>
  );
}

function PieceOfClothing({ item, onIncrease, onDecrease, onDelete }) {
  return (
    <>
      <li className="item-container">
        <img src={item.image} alt={item.description}></img>
        <div className="item-description">
          <span id="clothing-type">{item.type}</span>
          <span>{item.description}</span>
        </div>
        <div className="item-quantity">
          <button id="remove" onClick={onDecrease}>
            -
          </button>
          <span> {item.quantity} </span>
          <button id="add" onClick={onIncrease}>
            +
          </button>
        </div>
        <span id="price">€ {item.price * item.quantity}.00</span>
        <span id="delete" onClick={() => onDelete(item.id)}>
          ✖
        </span>
      </li>
    </>
  );
}

function Checkout({ toggle, onToggle, totalPrice }) {
  const [shippingPrice, setShippingPrice] = useState(5);

  function handleShippingPrice(e) {
    setShippingPrice(Number(e.target.value));
  }
  return toggle ? (
    <div className="checkout-container">
      <h2>Summary</h2>
      <div className="price-before-shipping">
        <span>ITEMS {itemsArr.length}</span>
        <span>€ {totalPrice}.00</span>
      </div>
      <div className="shipping-container">
        <h3>SHIPPING</h3>
        <select onChange={handleShippingPrice}>
          <option value={5}>Standard-Delivery-€5.00 (3-4 Days)</option>
          <option value={8}>Fast-Delivery-€8.00 (2-3 Days)</option>
          <option value={12}> Express-Delivery-€12.00 (1 Day)</option>
        </select>
      </div>
      <p className="final-price">
        TOTAL PRICE €{totalPrice + shippingPrice}.00
      </p>
      <Button>Place order</Button>
      <button id="back-to-shop" onClick={onToggle}>
        ⬅ Back to shop
      </button>
    </div>
  ) : null;
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} id="checkout-btn">
      {children}
    </button>
  );
}
