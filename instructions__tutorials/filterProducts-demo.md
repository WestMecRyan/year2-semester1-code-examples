```js
// src/utils/groceryUtils.js
export const filterByCategory = (items, category) => {
  return items.filter(item => item.category.toLowerCase() === category.toLowerCase());
};

export const filterByPriceRange = (items, minPrice, maxPrice) => {
  return items.filter(item => item.price >= minPrice && item.price <= maxPrice);
};

export const sortByPrice = (items, ascending = true) => {
  return [...items].sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
};

// src/components/GroceryList.jsx
import styles from "../styles/GroceryList.module.css";
import { filterByCategory, sortByPrice } from '../utils/groceryUtils';

export default function GroceryList({ items }) {
  // Example of using utility functions
  const produceItems = filterByCategory(items, 'produce');
  const sortedItems = sortByPrice(produceItems, true);

  return (
    <div className={styles.list}>
      <h3>Produce Items (Sorted by Price)</h3>
      {sortedItems.map(i => (
        <div key={i.id} className={styles.item}>
          <h2>{i.name}</h2>
          <p>Category: {i.category}</p>
          <p>Price: ${i.price.toFixed(2)}</p>
        </div>
      ))}

      <h3>All Items</h3>
      {items.map(i => (
        <div key={i.id} className={styles.item}>
          <h2>{i.name}</h2>
          <p>Category: {i.category}</p>
          <p>Price: ${i.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

// src/pages/Groceries.jsx
import { useState, useEffect } from "react";
import GroceryList from "../components/GroceryList";
import axios from "axios";
import { filterByPriceRange } from '../utils/groceryUtils';

export default function Groceries() {
  const [groceries, setGroceries] = useState([]);
  const [affordableItems, setAffordableItems] = useState([]);

  useEffect(() => {
    async function fetchGroceries() {
      try {
        const response = await axios.get("/dummy-data/groceries.json");
        setGroceries(response.data);
        // Example of using utility function in effect
        const affordable = filterByPriceRange(response.data, 0, 5);
        setAffordableItems(affordable);
      } catch (err) {
        console.error("something went wrong fetching groceries", err);
      }
    }
    fetchGroceries();
  }, []);

  return (
    <div>
      <h1>Groceries</h1>
      <h2>Affordable Items (Under $5)</h2>
      <GroceryList items={affordableItems} />
      <h2>All Items</h2>
      <GroceryList items={groceries} />
    </div>
  );
}
```