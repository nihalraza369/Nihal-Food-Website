
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/FoodCartContext';
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, CreditCard, MapPin, User, Phone, Mail, Lock } from 'lucide-react';

const FoodCheckoutPage = () => {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const deliveryFee = 2.00;
  const totalAmount = cartTotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required.";
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required.";
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = "Card number must be 16 digits.";
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required.";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = "Expiry date must be MM/YY.";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required.";
    else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your order. We'll get it to you soon!",
        className: 'bg-green-500 text-white border-green-600',
      });
      clearCart();
      navigate('/'); 
    } else {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      });
    }
  };
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const InputField = ({ id, name, label, icon, error, ...props }) => (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="font-medium text-sm flex items-center">
        {icon && React.cloneElement(icon, { size: 16, className: "mr-2 text-muted-foreground"})}
        {label}
      </Label>
      <Input id={id} name={name} onChange={handleChange} value={formData[name]} {...props} className={`search-input-food ${error ? 'border-destructive focus:border-destructive' : ''}`} />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );


  if (cartCount === 0 && cartTotal === 0) { // Check if cart was cleared after successful order
     return (
      <motion.div 
        className="section-padding-food pt-24 md:pt-32 min-h-[70vh] flex flex-col items-center justify-center text-center"
        variants={pageVariants} initial="initial" animate="animate"
      >
        <h1 className="text-3xl font-black mb-4">Checkout</h1>
        <p className="text-lg text-muted-foreground mb-8">Your cart is empty. Add some items to proceed to checkout.</p>
        <Button asChild size="lg" className="button-food-primary">
          <Link to="/menu">
            <ArrowLeft size={20} className="mr-2" /> Back to Menu
          </Link>
        </Button>
      </motion.div>
    );
  }


  return (
    <motion.div 
      className="section-padding-food pt-24 md:pt-32"
      variants={pageVariants} initial="initial" animate="animate"
    >
      <div className="container-food">
        <Link to="/cart" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform"/> Back to Cart
        </Link>
        <h1 className="text-4xl md:text-5xl font-black mb-10 gradient-text-food">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 bg-card p-6 sm:p-8 rounded-2xl shadow-xl border border-border/50">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}>
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                <InputField id="name" name="name" label="Full Name" placeholder="nihal raza" icon={<User />} error={errors.name} />
                <InputField id="email" name="email" type="email" label="Email Address" placeholder="nihal.raza@example.com" icon={<Mail />} error={errors.email} />
                <InputField id="phone" name="phone" type="tel" label="Phone Number" placeholder="(123) 456-7890" icon={<Phone />} error={errors.phone} />
                <InputField id="address" name="address" label="Street Address" placeholder="123 Foodie Lane" className="sm:col-span-2" icon={<MapPin />} error={errors.address} />
                <InputField id="city" name="city" label="City" placeholder="Foodville" icon={<MapPin />} error={errors.city} />
                <InputField id="zip" name="zip" label="ZIP Code" placeholder="12345" icon={<MapPin />} error={errors.zip} />
              </div>
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="mt-10">
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                <InputField id="cardNumber" name="cardNumber" label="Card Number" placeholder="•••• •••• •••• ••••" className="sm:col-span-2" icon={<CreditCard />} error={errors.cardNumber} />
                <InputField id="expiryDate" name="expiryDate" label="Expiry Date" placeholder="MM/YY" icon={<CreditCard />} error={errors.expiryDate} />
                <InputField id="cvv" name="cvv" label="CVV" placeholder="•••" icon={<Lock />} error={errors.cvv} />
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="lg:col-span-1 p-6 bg-primary/5 rounded-2xl shadow-xl sticky top-28 border border-primary/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Your Order</h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                  <div>
                    <p className="font-medium">{item.name} <span className="text-xs text-muted-foreground">x{item.quantity}</span></p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 py-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-primary mt-2 pt-2 border-t border-primary/30">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full button-food-primary !text-lg mt-6">
              <Lock size={20} className="mr-2.5" /> Place Order Securely
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default FoodCheckoutPage;
