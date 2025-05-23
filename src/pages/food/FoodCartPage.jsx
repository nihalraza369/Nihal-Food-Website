
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/FoodCartContext';
import { PlusCircle, MinusCircle, Trash2, ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';

const FoodCartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" } }),
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  if (cartCount === 0) {
    return (
      <motion.div 
        className="section-padding-food pt-24 md:pt-32 min-h-[70vh] flex flex-col items-center justify-center text-center"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <ShoppingCart size={80} className="text-muted-foreground mb-8" />
        <h1 className="text-4xl font-black mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          Looks like you haven't added any delicious items to your cart yet.
        </p>
        <Button asChild size="lg" className="button-food-primary">
          <Link to="/menu">
            <ArrowLeft size={20} className="mr-2" /> Start Shopping
          </Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="section-padding-food pt-24 md:pt-32"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container-food">
        <h1 className="text-4xl md:text-5xl font-black mb-10 gradient-text-food">Your Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 }}}}
          >
            {cartItems.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-border rounded-xl shadow-sm bg-card"
                variants={itemVariants}
                custom={index}
                layout
              >
                <Link to={`/item/${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0">
                  <img  
                    alt={item.name} 
                    className="w-full h-full object-cover"
                   src={item.Image} />
                </Link>
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/item/${item.id}`}>
                    <h3 className="text-lg font-semibold hover:text-primary transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2 my-2 sm:my-0">
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-primary hover:bg-primary/10">
                    <MinusCircle size={20} />
                  </Button>
                  <span className="text-md font-semibold w-10 text-center">{item.quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-primary hover:bg-primary/10">
                    <PlusCircle size={20} />
                  </Button>
                </div>
                <p className="text-lg font-bold text-primary w-24 text-center sm:text-right">${(item.price * item.quantity).toFixed(2)}</p>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:bg-destructive/10">
                  <Trash2 size={20} />
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="lg:col-span-1 p-6 bg-primary/5 rounded-xl shadow-lg sticky top-28"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: cartItems.length * 0.1 + 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6 text-foreground/90">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>$2.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary border-t border-border pt-3 mt-3">
                <span>Total Amount</span>
                <span>${(cartTotal + 2.00).toFixed(2)}</span>
              </div>
            </div>
            <Button size="lg" className="w-full button-food-primary !text-base" asChild>
              <Link to="/checkout">
                <CreditCard size={20} className="mr-2.5" /> Proceed to Checkout
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={clearCart} className="w-full mt-4 text-destructive hover:border-destructive hover:bg-destructive/5">
              Clear Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCartPage;
