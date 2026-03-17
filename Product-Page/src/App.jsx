import { useState } from "react";
const PRODUCTS = [
  { id: 1, name: "Tomatoes", price: 40, category: "Vegetables" },
  { id: 2, name: "Milk", price: 25, category: "Dairy" },
  { id: 3, name: "Bread", price: 35, category: "Bakery" },
  { id: 4, name: "Cheese", price: 80, category: "Dairy" },
  { id: 5, name: "Spinach", price: 30, category: "Vegetables" },
  { id: 6, name: "Croissant", price: 50, category: "Bakery" },
];
function App() {
  let [search, setSearch] = useState("");

  let [filter, setFilter] = useState([]);

  let derivedData = PRODUCTS;
  if (search.length > 0) {
    derivedData = PRODUCTS.filter((obj) =>
      obj.name.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }
  let filterHandler = (e) => {
    setFilter((prev) => {
      let temp = [...prev];
      if (e.target.checked) temp.push(e.target.value);
      else temp = temp.filter((cat) => cat !== e.target.value);
      return temp;
    });
  };

  if (filter.length > 0) {
    derivedData = derivedData.filter((obj) =>
      filter.some((cat) => obj.category === cat),
    );
  }
  let categories = Array.from(
    new Set(PRODUCTS.map(({ category }) => category)),
  );

  console.log(derivedData, filter, "d");
  return (
    <main>
      <input
        type="text"
        placeholder="Search Product By Name"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-container">
        <p>{derivedData.length}</p>

        <span className="filter">
          {categories.map((category, index) => {
            return (
              <div className="filter-tab" key={index}>
                <input
                  id={category}
                  type="checkbox"
                  value={category}
                  checked={filter.includes(category)}
                  onChange={filterHandler}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            );
          })}
        </span>

        {derivedData.length > 0 &&
          derivedData.map((obj) => {
            return (
              <div className="product-card" key={obj.id}>
                <p className="name-tag">{obj.name}</p>
                <p className="price-tag">{obj.price}</p>
                <span className="categories">{obj.category}</span>
              </div>
            );
          })}
        {derivedData.length === 0 && <p>No product found</p>}
      </div>
    </main>
  );
}

export default App;
