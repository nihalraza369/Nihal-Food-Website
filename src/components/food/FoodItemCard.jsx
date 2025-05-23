
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusCircle, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/FoodCartContext';

const FoodItemCard = ({ item, index }) => {
  const { addToCart } = useCart();

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.07,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      className="food-item-card group"
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      layout
    >
      <Link to={`/item/${item.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img  
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={item.Image} />
          {item.isNew && (
            <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Zap size={14} /> NEW
            </span>
          )}
          {item.rating && (
             <span className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
              <Star size={14} className="fill-current" /> {item.rating.toFixed(1)}
            </span>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/item/${item.id}`} className="block">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{item.name}</h3>
          </Link>
          {item.tags && item.tags.length > 0 && (
            <span className="tag-food ml-2 flex-shrink-0 mt-0.5">{item.tags[0]}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3 h-10 overflow-hidden">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <p className="text-2xl font-extrabold text-primary">
            ${item.price.toFixed(2)}
          </p>
          <Button 
            size="default" 
            className="button-food-primary !rounded-lg group-hover:scale-105 transition-transform"
            onClick={() => addToCart(item)}
            aria-label={`Add ${item.name} to cart`}
          >
            <PlusCircle size={20} className="mr-2" /> Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodItemCard;
