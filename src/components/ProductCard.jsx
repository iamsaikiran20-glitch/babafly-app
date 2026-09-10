function ProductCard({ product, addToCart }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <div className="flex h-44 items-center justify-center bg-gray-100 text-6xl">
        {product.image}
      </div>

      <div className="p-4">

        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h2 className="mt-1 font-bold">
          {product.name}
        </h2>

        <p className="mt-2 font-bold">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full rounded-full bg-gray-900 py-3 font-semibold text-white hover:bg-gray-700"
        >
          Add to Cart
        </button>

      </div>

    </div>
  )
}

export default ProductCard