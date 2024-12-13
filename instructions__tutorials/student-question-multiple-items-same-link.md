# Question and Answer Friday 12/13/24

## Question

How would we make multiple items have the same link to go to the same page, and when you go onto that page, only the item you clicked on and it's description would be showing alongside the footer, header and navbar?

## Answer

- Make a ProductDetails page
```js
`// src/pages/ProductDetails.jsx`
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../config/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        // First, try to get the product from cached data
        const cachedData = sessionStorage.getItem("groceries");
        if (cachedData) {
          const groceries = JSON.parse(cachedData);
          const cachedProduct = groceries.find(
            item => item.id === parseInt(id) || item.id === id
          );
          if (cachedProduct) {
            setProduct(cachedProduct);
            setLoading(false);
            return;
          }
        }

        // If not in cache, try to fetch from API
        const response = await api.get(`/groceries/${id}.json`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <div>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
      </div>
    </div>
  );
}

```

- add a dynamic route in App.jsx that uses `/:` syntax for the parameters
```js
// Updated App.jsx with new route
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Groceries from "./pages/Groceries";
import ProductDetails from "./pages/ProductDetails";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groceries" element={<Groceries />} />
        <Route path="/groceries/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}
```

- update the grocery list to use the dynamic routes as Link paths
```js
// Updated GroceryList.jsx
import { Link } from 'react-router-dom';
import styles from "../styles/GroceryList.module.css";

export default function GroceryList({ items }) {
  return (
    <div className={styles.list}>
      {items.map(item => (
        <Link
          to={`/groceries/${item.id}`}
          key={item.id}
          className={styles.item}
        >
          <h2>{item.name}</h2>
          <p>Category: {item.category}</p>
          <p>Price: {item.price}</p>
        </Link>
      ))}
    </div>
  );
}
```