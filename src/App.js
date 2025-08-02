import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [demoButtonText, setDemoButtonText] = useState('Click Me!');

  const handleDemoButtonClick = () => {
    setDemoButtonText(demoButtonText === 'Click Me!' ? 'Button Clicked!' : 'Click Me!');
  };

  return (
    <Provider store={store}>
      <Router>
        <AppNavbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
          
          {/* Demo button for testing purposes */}
          <div className="mt-3 text-center">
            <button 
              className="btn btn-primary"
              onClick={handleDemoButtonClick}
              data-testid="demo-button"
            >
              {demoButtonText}
            </button>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;