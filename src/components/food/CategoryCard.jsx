
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CategoryCard = ({ category, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      layout
    >
      <Link to={`/menu/${category.slug}`} className="block food-category-card group h-full">
        <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-5 transform group-hover:scale-110 transition-transform duration-300">
          <img  
            alt={category.name} 
            className="w-full h-full object-contain"
           src={category.Image} />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{category.itemCount} items</p>
        <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
          View Menu <ChevronRight size={16} className="ml-1" />
        </span>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
