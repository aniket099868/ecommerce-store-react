import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCartItems((currentItems) => [...currentItems, product]);
  };

  const removeItem = (index) => {
    setCartItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <section className="home-page">
      <div className="toolbar">
        <div className="search-control">
          <label className="sr-only" htmlFor="search">
            Search products
          </label>
          <input
            id="search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
          />
          <p className="search-hint">
            {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} found
          </p>
        </div>

        <div className="cart-summary">
          <div className="cart-badge">{cartItems.length} items</div>
          <div className="cart-total">₹{totalPrice}</div>
        </div>
      </div>

      <div className="panel-grid">
        <div className="product-panel">
          <div className="panel-header">
            <h2>Products</h2>
            <p className="panel-description">
              Search, browse, and add items to your cart.
            </p>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>

        <aside className="cart-panel">
          <div className="cart-panel-header">
            <div>
              <h2>Your Cart</h2>
              <p className="panel-description">
                Items stay saved in local storage.
              </p>
            </div>
            <button
              className="text-button"
              type="button"
              onClick={clearCart}
              disabled={cartItems.length === 0}
            >
              Clear
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="empty-message">Your cart is empty.</p>
          ) : (
            <ul className="cart-list">
              {cartItems.map((item, index) => (
                <li className="cart-item" key={`${item.id}-${index}`}>
                  <div>
                    <span>{item.name}</span>
                    <small>₹{item.price}</small>
                  </div>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {cartItems.length > 0 && (
            <div className="cart-footer">
              <strong>Total ₹{totalPrice}</strong>
              <button
                className="primary-button"
                type="button"
                onClick={() => alert("Order placed successfully!")}
              >
                Checkout
              </button>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export default Home;
