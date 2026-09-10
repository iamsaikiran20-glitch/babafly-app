function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-2xl font-bold">
        BabaFly 💎
      </h1>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/categories">Categories</a>
        <a href="/cart">Cart</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  )
}

export default Navbar