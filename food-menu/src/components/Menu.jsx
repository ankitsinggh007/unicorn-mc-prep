import React from "react";

function Menu({
  data,
  toggle,
  category,
  error,
  loader,
  onAddToCart,
  filter,
  setCategories,
  filterHandler,
  retry,
}) {
  let menu = (
    <div>
      <span>
        {category.map((cat, index) => (
          <span key={cat + index}>
            <label htmlFor={cat}>{cat}</label>
            <input
              id={cat}
              type="checkbox"
              checked={filter.includes(cat)}
              onChange={() => filterHandler(cat)}
            />
          </span>
        ))}
      </span>

      {data.map(({ name, cuisine, caloriesPerServing, id }) => {
        return (
          <div key={id}>
            <span>
              <p>{name} : </p>
              <p>{caloriesPerServing}</p>
              <p>{cuisine}</p>
            </span>
            <button onClick={(e) => onAddToCart(id)}>Add To cart</button>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {loader && <p> loading th menu...</p>}

      {error && (
        <div>
          <p>{error}</p>
          <button onClick={retry}>Try Again</button>
        </div>
      )}

      {!loader && !error && (data.length === 0 ? <p>No Food To Show</p> : menu)}
    </div>
  );
}

export default Menu;
