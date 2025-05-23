
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Utensils, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroFood = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
  };
  
  return (
    <div className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden section-padding-food bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="absolute inset-0 -z-10 opacity-50 bg-hero-pattern-food bg-repeat"></div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-accent/10 via-transparent to-transparent opacity-70"></div>
      </div>

      <div className="container-food text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-8"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-5 py-2.5 bg-white border border-primary/20 rounded-full text-sm font-semibold text-primary shadow-md"
          >
            <Sparkles size={18} className="mr-2.5" />
            Freshly Prepared, Just For You!
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter"
          >
            Taste the <span className="gradient-text-food">Difference</span> <br className="hidden md:block" /> With <span className="text-primary">NihalFood</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
          >
            From sizzling burgers to aromatic biryanis and cheesy pizzas, discover a world of flavors delivered to your doorstep.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="button-food-primary !text-base !px-10 !py-7" asChild>
              <Link to="/menu">
                <Utensils size={22} className="mr-2.5" /> View Full Menu
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="button-food-outline !text-base !px-10 !py-7" asChild>
              <Link to="/offers">
                Today's Offers <ArrowRight size={20} className="ml-2.5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="w-40 h-20 md:w-56 md:h-28 relative">
          <img  alt="Delicious looking burger" class="absolute left-0 top-0 w-16 h-16 md:w-20 md:h-20 object-contain transform -rotate-12 animate-pulse-subtle delay-200" src="https://images.unsplash.com/photo-1586816001966-79b736744398" />
          <img  alt="Slice of pepperoni pizza" class="absolute right-0 top-0 w-16 h-16 md:w-20 md:h-20 object-contain transform rotate-12 animate-pulse-subtle delay-500" src="https://images.unsplash.com/photo-1592861764633-8278f6f6a322" />
          <img  alt="Bowl of biryani" class="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-16 md:w-20 md:h-20 object-contain animate-pulse-subtle" src="https://images.unsplash.com/photo-1697155406055-2db32d47ca07" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroFood;
