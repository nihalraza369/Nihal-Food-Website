
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Search, User, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/FoodCartContext';

const NavbarFood = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <UtensilsCrossed size={18} /> },
    { name: 'Menu', href: '/menu', icon: <Menu size={18} /> },
    { name: 'Offers', href: '/offers', icon: <ShoppingCart size={18} /> },
    { name: 'Contact', href: '/contact', icon: <User size={18} /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled || isOpen ? 'bg-background/90 backdrop-blur-lg shadow-lg border-b border-border/20' : 'bg-transparent'}`}
    >
      <div className="container-food">
        <nav className="flex items-center justify-between py-3 md:py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-3xl font-black flex items-center">
              <UtensilsCrossed size={28} className="mr-2.5 text-primary" />
              <span className="gradient-text-food">NihalFood</span>
            </Link>
          </motion.div>

          <motion.div 
            className="hidden lg:flex items-center space-x-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMenu}
                className={`nav-link-food ${location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href)) ? 'active text-primary' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          <motion.div 
            className="flex items-center space-x-2 md:space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary" aria-label="Search">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary relative" asChild aria-label="Shopping Cart">
              <Link to="/cart">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex text-foreground/70 hover:text-primary" aria-label="User Profile">
              <User size={20} />
            </Button>
            <div className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu" className="text-foreground/70 hover:text-primary">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </motion.div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 lg:hidden pt-[70px] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container-food flex flex-col space-y-2 p-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`flex items-center text-lg py-3.5 px-4 rounded-lg transition-colors ${location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href)) ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-foreground/5'}`}
                    onClick={closeMenu}
                  >
                    {link.icon && <span className="mr-3">{link.icon}</span>}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                className="pt-6 border-t border-border/50"
              >
                 <Button className="w-full button-food-primary py-3 text-base">
                    <User size={18} className="mr-2" /> Login / Sign Up
                 </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavbarFood;
