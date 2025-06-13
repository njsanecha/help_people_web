import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Cart from './pages/cart'
import ProductDetail from './pages/ProductDetail'
import HomePage from './pages/Home'
import UploadUsers from './pages/UploadUsers'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import OrderConfirmation from './pages/OrderConfirmation'
import { getAllProducts, getAllCategories } from './api/Server'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllProducts().then(data => setProducts(data));
    getAllCategories().then(data => setCategories(data));
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setProductOpen(true)
  }

    const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setProductOpen(false) 
    setCartOpen(true) 
  }

  const removeFromCart = (id) => {
  setCartItems(prev => 
    prev
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  )
}

  return (
    <Router>
      <Navbar
        products={products}
        categories={categories}
        onCartClick={() => setCartOpen(true)} 
        onProductClick={handleProductClick} 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />
      
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload_users" element={<UploadUsers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order_confirmation" element={<OrderConfirmation />} />
        <Route path="/settings" element={<Settings  
        products={products}
        categories={categories}
        setProducts={setProducts}
        setCategories={setCategories}/>} />
      </Routes>

      <Cart open={cartOpen} setOpen={setCartOpen} items={cartItems} removeFromCart={removeFromCart} setItems={setCartItems} />
      <ProductDetail open={productOpen} setOpen={setProductOpen} product={selectedProduct} onAddToCart={handleAddToCart} />

    </Router>
  )
}
