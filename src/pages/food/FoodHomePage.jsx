
import React from 'react';
import { motion } from 'framer-motion';
import HeroFood from '@/components/food/HeroFood';
import FoodItemCard from '@/components/food/FoodItemCard';
import CategoryCard from '@/components/food/CategoryCard';
import SpecialOfferCard from '@/components/food/SpecialOfferCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, ChefHat, Truck, Image } from 'lucide-react';

const mockFoodItems = [
  { id: 'burger1', name: 'Classic Cheeseburger', price: 8.99, description: 'Juicy beef patty, melted cheddar, lettuce, tomato, and our special sauce.', rating: 4.5, tags: ['Burger'], isNew: true, imageSlug: 'classic-cheeseburger',Image:"https://i.pinimg.com/736x/cb/57/cd/cb57cd9866688af0ddbca027d791aafc.jpg" },
  { id: 'pizza1', name: 'Pepperoni Feast Pizza', price: 12.50, description: 'Loaded with spicy pepperoni and mozzarella on a crispy crust.', rating: 4.8, tags: ['Pizza'], imageSlug: 'pepperoni-pizza',Image:"https://i.pinimg.com/736x/4d/a7/3f/4da73f313deef52c2373795a970b4082.jpg" },
  { id: 'biryani1', name: 'Chicken Dum Biryani', price: 10.99, description: 'Aromatic basmati rice cooked with tender chicken and exotic spices.', rating: 4.7, tags: ['Biryani'], imageSlug: 'chicken-biryani' ,Image:"https://i.pinimg.com/736x/be/04/a8/be04a81dd02f8802bcc92c67cc713a98.jpg"},
  { id: 'noodles1', name: 'Spicy Schezwan Noodles', price: 9.50, description: 'Stir-fried noodles with vegetables in a fiery Schezwan sauce.', rating: 4.3, tags: ['Noodles'], isNew: true, imageSlug: 'schezwan-noodles',Image:"https://i.pinimg.com/736x/97/e4/85/97e4856ba70e69e56d3d45b987260a6a.jpg" },
  { id: 'pasta1', name: 'Creamy Alfredo Pasta', price: 11.00, description: 'Fettuccine pasta in a rich and creamy Alfredo sauce with grilled chicken.', rating: 4.6, tags: ['Pasta'], imageSlug: 'alfredo-pasta' },
  { id: 'salad1', name: 'Fresh Garden Salad', price: 7.25, description: 'Crisp lettuce, tomatoes, cucumbers, carrots, and a light vinaigrette.', rating: 4.2, tags: ['Salad'], imageSlug: 'garden-salad' },
  { id: 'momo1', name: 'Steamed Chicken Momos', price: 6.99, description: 'Delicious steamed dumplings filled with seasoned minced chicken.', rating: 4.9, tags: ['Momos'], imageSlug: 'chicken-momos' },
  { id: 'drink1', name: 'Refreshing Limca', price: 2.50, description: 'A zesty and lemony lime drink to quench your thirst.', rating: 4.0, tags: ['Drinks'], imageSlug: 'limca-drink' },
];

const mockCategories = [
  { name: 'Burgers', slug: 'burgers', itemCount: 12, imageSlug: 'category-burgers',Image:"https://i.pinimg.com/736x/cb/57/cd/cb57cd9866688af0ddbca027d791aafc.jpg" },
  { name: 'Pizzas', slug: 'pizzas', itemCount: 8, imageSlug: 'category-pizzas',Image:"https://i.pinimg.com/736x/a6/34/c8/a634c8e44a0cc72bd6ae9b345678448a.jpg" },
  { name: 'Biryani', slug: 'biryani', itemCount: 5, imageSlug: 'category-biryani',Image:"https://i.pinimg.com/736x/b2/f3/69/b2f369286e98dcecedab6988d2a5bda3.jpg" },
  { name: 'Noodles & Pasta', slug: 'noodles-pasta', itemCount: 10, imageSlug: 'category-noodles-pasta',Image:"https://i.pinimg.com/736x/c2/f6/f0/c2f6f014d08a686c1c4a44a031c6646d.jpg" },
  { name: 'Momos', slug: 'momos', itemCount: 6, imageSlug: 'category-momos',Image:"https://i.pinimg.com/736x/c5/7b/02/c57b02de251872629042f30942a26540.jpg" },
  { name: 'Salads', slug: 'salads', itemCount: 4, imageSlug: 'category-salads',Image:"https://i.pinimg.com/736x/dc/bf/09/dcbf09334b88a24e7ebb9ef24a52657e.jpg" },
  { name: 'Desserts', slug: 'desserts', itemCount: 7, imageSlug: 'category-desserts' ,Image:"https://i.pinimg.com/736x/d3/16/dd/d316ddba890f245dc72d995729699f02.jpg"},
  { name: 'Drinks', slug: 'drinks', itemCount: 15, imageSlug: 'category-drinks',Image:"https://i.pinimg.com/736x/02/e9/48/02e948b67e8039ddb2abe640c67f1223.jpg" },
];

const mockOffers = [
  { id: 'offer1', title: 'Weekend Burger Bonanza', description: 'Get 20% off on all beef burgers this weekend! Use code BURGER20.', tag: 'Limited Time', validity: 'Valid till Sunday', link: '/offers/burger-bonanza', imageSlug: 'offer-burger' ,Image:"https://i.pinimg.com/736x/cb/57/cd/cb57cd9866688af0ddbca027d791aafc.jpg"},
  { id: 'offer2', title: 'Pizza Party Combo', description: 'Buy any 2 large pizzas and get a free 1.5L cold drink and garlic bread.', tag: 'Combo Deal', validity: 'Ongoing Offer', link: '/offers/pizza-party', imageSlug: 'offer-pizza' ,Image:"https://i.pinimg.com/736x/4d/a7/3f/4da73f313deef52c2373795a970b4082.jpg"},
];

const FoodHomePage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.1 } }
  };

  return (
    <div className="overflow-x-hidden">
      <HeroFood />

      <motion.section 
        className="section-padding-food"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container-food">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-0">Popular <span className="gradient-text-food">Categories</span></h2>
            <Button variant="outline" asChild className="button-food-outline">
              <Link to="/menu">View All Categories <ArrowRight size={18} className="ml-2" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {mockCategories.slice(0,8).map((category, index) => (
              <CategoryCard key={category.slug} category={category} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="section-padding-food bg-primary/5"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container-food">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-0">Today's <span className="gradient-text-food">Featured Items</span></h2>
            <Button variant="outline" asChild className="button-food-outline">
              <Link to="/menu?filter=featured">See All Featured <ArrowRight size={18} className="ml-2" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {mockFoodItems.slice(0, 4).map((item, index) => (
              <FoodItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section-padding-food"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container-food">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 md:mb-16">Special <span className="gradient-text-food">Offers</span> Just For You!</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mockOffers.map((offer, index) => (
              <SpecialOfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </div>
      </motion.section>
      
      <motion.section
        className="section-padding-food bg-secondary/10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container-food">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 md:mb-16">Why <span className="gradient-text-food">NihalFood?</span></h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <ChefHat size={48} className="text-primary" />, title: "Authentic Flavors", desc: "Prepared by experienced chefs using the freshest ingredients." },
              { icon: <Utensils size={48} className="text-primary" />, title: "Wide Variety", desc: "From local favorites to global cuisines, something for everyone." },
              { icon: <Truck size={48} className="text-primary" />, title: "Fast Delivery", desc: "Hot and delicious food delivered quickly to your doorstep." }
            ].map((item, index) => (
              <motion.div 
                key={item.title} 
                className="glass-card-food p-8 hover:shadow-primary/10"
                initial={{ opacity:0, scale:0.9 }}
                whileInView={{ opacity:1, scale:1 }}
                transition={{ duration:0.5, delay: index * 0.1}}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default FoodHomePage;
