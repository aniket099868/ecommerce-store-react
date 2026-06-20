function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <img
        className="product-image"
        src={`${product.image}?auto=format&fit=crop&w=640&q=80`}
        alt={product.name}
      />

      <div className="product-content">
        <div>
          <h3>{product.name}</h3>
          <p className="product-price">₹{product.price}</p>
        </div>

        <button
          className="primary-button"
          onClick={() => addToCart(product)}
          type="button"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
