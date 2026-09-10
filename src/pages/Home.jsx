function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-amber-50 px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-700">
          Timeless Jewellery
        </p>

        <h1 className="text-5xl font-bold text-gray-900 md:text-7xl">
          Find Your
          <br />
          Perfect Jewellery
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
          Discover beautiful jewellery crafted to make every moment
          unforgettable.
        </p>

        <button className="mt-8 rounded-full bg-gray-900 px-8 py-3 font-semibold text-white">
          Shop Collection
        </button>
      </section>

      <section className="px-6 py-16">
        <h2 className="text-center text-3xl font-bold">
          Shop By Category
        </h2>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-pink-100 p-10 text-center">
            <div className="text-5xl">💍</div>
            <h3 className="mt-4 text-xl font-semibold">Rings</h3>
          </div>

          <div className="rounded-2xl bg-blue-100 p-10 text-center">
            <div className="text-5xl">📿</div>
            <h3 className="mt-4 text-xl font-semibold">Necklaces</h3>
          </div>

          <div className="rounded-2xl bg-yellow-100 p-10 text-center">
            <div className="text-5xl">✨</div>
            <h3 className="mt-4 text-xl font-semibold">Earrings</h3>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home