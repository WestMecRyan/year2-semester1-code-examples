import { useState, useEffect } from "react";
import GroceryList from "../components/GroceryList";
import { sortAscending, filterByCategory } from "../utils/groceryFunctions";
import axios from "axios";

export default function Groceries() {
  const [groceries, setGroceries] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    async function fetchGroceries() {
      try {
        const response = await axios.get("/dummy-data/groceries.json");

        // set the state of the groceries to the response.data
        setGroceries(response.data);
        setFilteredItems(response.data);
      } catch (err) {
        console.error("something went wrong fetching groceries", err);
      }
    }
    fetchGroceries();
  }, []);

  useEffect(() => {
    // console.log(groceries);
    sessionStorage.setItem("groceries", JSON.stringify(groceries));
    console.log(JSON.parse(sessionStorage.getItem("groceries")));
  }, [groceries]);

  const handleSort = () => {
    const sorted = sortAscending(groceries);
    setFilteredItems(sorted);
  };
  const handleCategoryFilter = category => {
    const filtered = filterByCategory(groceries, category);
    setFilteredItems(filtered);
  };
  return (
    <div>
      <div>
        <button onClick={handleSort}>Sort by Price</button>
        <select onChange={e=>handleCategoryFilter(e.target.value)}>
          <option value="all">All Items</option>
          <option value="dairy">Dairy Products</option>
        </select>
      </div>
      <h1>Groceries</h1>
      <GroceryList items={filteredItems} />
    </div>
  );
}
