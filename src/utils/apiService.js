import api from './api'

const formatProduct = (product) => {
  const categoryMap = {
    5: 'Bracelets',
    6: 'Rings',
    7: 'Necklaces',
    8: 'Earrings',
  }

  const metalMap = {
    5: 'Gold',
    6: 'Gold',
    7: 'Silver',
    8: 'Rose Gold',
  }

  const polishMap = {
    5: 'Glossy',
    6: 'Matte',
    7: 'Glossy',
    8: 'Diamond',
  }

  return {
    id: product.id,
    name: product.title || 'BabaFly Jewellery',
    price: Math.round(Number(product.price || 0) * 90),

    category: categoryMap[product.id] || 'Jewellery',
    metal: metalMap[product.id] || 'Gold',
    polish: polishMap[product.id] || 'Glossy',

    image: product.image || '💎',

    description:
      product.description ||
      'Beautifully crafted jewellery designed to add elegance and style.',

    rating: product.rating?.rate || 0,
    stock: product.rating?.count || 0,
  }
}

export const getProducts = async () => {
  const response = await api.get('/products/category/jewelery')

  return response.data.map(formatProduct)
}

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`)

  return formatProduct(response.data)
}

export const searchProducts = async (query) => {
  const response = await api.get('/products/category/jewelery')

  const products = response.data.map(formatProduct)

  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )
}

export const getCategories = async () => {
  return ['Rings', 'Necklaces', 'Earrings', 'Bracelets']
}

export const getProductsByCategory = async (category) => {
  const products = await getProducts()

  if (!category || category === 'All') {
    return products
  }

  return products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  )
}