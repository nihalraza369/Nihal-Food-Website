
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tag, Clock } from 'lucide-react';

const SpecialOfferCard = ({ offer, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1] 
      }
    })
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      className="relative rounded-2xl overflow-hidden shadow-2xl group food-item-card !border-accent/50"
    >
      <div className="absolute inset-0">
        <img  
          alt={offer.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
         src={offer.Image} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-80 md:h-96">
        <div>
          <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            {offer.tag}
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">{offer.title}</h3>
          <p className="text-sm text-white/80 mb-4 line-clamp-2">{offer.description}</p>
          <div className="flex items-center text-xs text-yellow-300 mb-5">
            <Clock size={14} className="mr-1.5" />
            <span>{offer.validity}</span>
          </div>
          <Button asChild size="lg" className="button-food-secondary w-full sm:w-auto !text-base">
            <Link to={offer.link}>
              <Tag size={18} className="mr-2" /> Claim Offer
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialOfferCard;
