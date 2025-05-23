
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import NavbarFood from '@/components/food/NavbarFood';
import FooterFood from '@/components/food/FooterFood';
import FoodHomePage from '@/pages/food/FoodHomePage';
import FoodMenuPage from '@/pages/food/FoodMenuPage';
import FoodItemDetailsPage from '@/pages/food/FoodItemDetailsPage';
import FoodCartPage from '@/pages/food/FoodCartPage';
import FoodCheckoutPage from '@/pages/food/FoodCheckoutPage';
import FoodContactPage from '@/pages/food/FoodContactPage';
import NotFoundPage from '@/pages/NotFoundPage'; 
import { CartProvider } from '@/contexts/FoodCartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <NavbarFood />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<FoodHomePage />} />
              <Route path="/menu" element={<FoodMenuPage />} />
              <Route path="/menu/:categorySlug" element={<FoodMenuPage />} />
              <Route path="/item/:itemId" element={<FoodItemDetailsPage />} />
              <Route path="/cart" element={<FoodCartPage />} />
              <Route path="/checkout" element={<FoodCheckoutPage />} />
              <Route path="/contact" element={<FoodContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <FooterFood />
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;