import { useEffect, useState, useRef } from "react";
import Menu from "./components/Menu.jsx";
const BASE_URL = `https://dummyjson.com/recipes?limit=20`;

function App() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [filter, setFilter] = useState([]); // veg || non - veg;
  const [search, setSearch] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  let timer = useRef(null);
  const [Cart, setCart] = useState([]);

  let fetchMenu = async () => {
    try {
      setLoader(true);
      setError(null);

      let response = await fetch(`${BASE_URL}`);
      if (!response.ok) throw Error(`Error Status:${response.status}`);

      let data = await response.json();

      setMenuData(data?.recipes || []);
    } catch (err) {
      setError(err?.message || "there something went wrong");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  let retry = () => {
    fetchMenu();
  };

  let addToCart = (id) => {
    setCart((prev) => {
      let picked = menuData.find((obj) => obj.id === id);

      let isPresent = prev.find((obj) => obj.id === id);

      if (isPresent) return [...prev];
      return [...prev, picked];
    });
  };

  let searchHandler = (e) => {
    setDebounceValue(e.target.value);

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 300);
  };
  let deriveData = menuData;
  if (search) {
    deriveData = menuData.filter((obj) =>
      obj.name.trim().toLowerCase().includes(search?.trim()?.toLowerCase()),
    );
  }

  let category = menuData.map((obj) => obj?.tags[0]);
  if (filter.length > 0)
    deriveData = deriveData.filter((obj) => filter.includes(obj?.tags[0]));
  let totalPrice = Cart.reduce(
    (prev, curr) => prev + (curr?.caloriesPerServing || 0),
    0,
  );

  let filterHandler = (cat) => {
    if (filter.includes(cat)) {
      setFilter((prev) => {
        let fil = [...prev].filter((obj) => obj !== cat);

        return [...fil];
      });
    } else {
      setFilter((prev) => [...prev, cat]);
    }
  };
  return (
    <main>
      <input
        aria-label="Search food"
        type="text"
        placeholder="search food"
        onChange={(e) => searchHandler(e)}
        value={debounceValue}
        disabled={!!error}
      />

      <Menu
        category={category}
        data={deriveData}
        error={error}
        loader={loader}
        filter={filter}
        onAddToCart={addToCart}
        filterHandler={filterHandler}
        retry={retry}
      />
      <div>Total Price:{totalPrice}</div>
    </main>
  );
}

export default App;
