
import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import FoodItemCard from '@/components/food/FoodItemCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Filter, Search, X, Utensils } from 'lucide-react';

const allMockFoodItems = [
  { id: 'burger1', name: 'Classic Cheeseburger', price: 8.99, description: 'Juicy beef patty, melted cheddar, lettuce, tomato, and our special sauce.', rating: 4.5, category: 'burgers', tags: ['Burger', 'Beef'], isNew: true, imageSlug: 'classic-cheeseburger',Image:"https://i.pinimg.com/736x/cb/57/cd/cb57cd9866688af0ddbca027d791aafc.jpg" },
  { id: 'burger2', name: 'Spicy Chicken Burger', price: 9.49, description: 'Crispy chicken fillet, spicy mayo, jalapenos, and lettuce.', rating: 4.6, category: 'burgers', tags: ['Burger', 'Chicken', 'Spicy'], imageSlug: 'spicy-chicken-burger',Image:"https://i.pinimg.com/736x/8c/e4/46/8ce4466288166b7050ab4cb40610db55.jpg" },
  { id: 'pizza1', name: 'Pepperoni Feast Pizza', price: 12.50, description: 'Loaded with spicy pepperoni and mozzarella on a crispy crust.', rating: 4.8, category: 'pizzas', tags: ['Pizza', 'Pepperoni'], imageSlug: 'pepperoni-pizza',Image:"https://i.pinimg.com/736x/4d/a7/3f/4da73f313deef52c2373795a970b4082.jpg" },
  { id: 'pizza2', name: 'Margherita Pizza', price: 10.00, description: 'Classic delight with fresh mozzarella, tomatoes, and basil.', rating: 4.4, category: 'pizzas', tags: ['Pizza', 'Vegetarian'], imageSlug: 'margherita-pizza',Image:"https://i.pinimg.com/736x/a6/34/c8/a634c8e44a0cc72bd6ae9b345678448a.jpg" },
  { id: 'biryani1', name: 'Chicken Dum Biryani', price: 10.99, description: 'Aromatic basmati rice cooked with tender chicken and exotic spices.', rating: 4.7, category: 'biryani', tags: ['Biryani', 'Chicken'], imageSlug: 'chicken-biryani',Image:"https://i.pinimg.com/736x/be/04/a8/be04a81dd02f8802bcc92c67cc713a98.jpg" },
  { id: 'noodles1', name: 'Spicy Schezwan Noodles', price: 9.50, description: 'Stir-fried noodles with vegetables in a fiery Schezwan sauce.', rating: 4.3, category: 'noodles-pasta', tags: ['Noodles', 'Spicy', 'Vegetarian'], isNew: true, imageSlug: 'schezwan-noodles',Image:"https://i.pinimg.com/736x/97/e4/85/97e4856ba70e69e56d3d45b987260a6a.jpg" },
  { id: 'pasta1', name: 'Creamy Alfredo Pasta', price: 11.00, description: 'Fettuccine pasta in a rich and creamy Alfredo sauce with grilled chicken.', rating: 4.6, category: 'noodles-pasta', tags: ['Pasta', 'Chicken'], imageSlug: 'alfredo-pasta',Image:"https://i.pinimg.com/736x/53/fa/8f/53fa8fec3f81a17aa318bd5be491b193.jpg" },
  { id: 'salad1', name: 'Fresh Garden Salad', price: 7.25, description: 'Crisp lettuce, tomatoes, cucumbers, carrots, and a light vinaigrette.', rating: 4.2, category: 'salads', tags: ['Salad', 'Vegetarian', 'Healthy'], imageSlug: 'garden-salad',Image:"https://i.pinimg.com/736x/39/ca/a3/39caa3f2791dc35df47947e34f502283.jpg" },
  { id: 'momo1', name: 'Steamed Chicken Momos', price: 6.99, description: 'Delicious steamed dumplings filled with seasoned minced chicken.', rating: 4.9, category: 'momos', tags: ['Momos', 'Chicken'], imageSlug: 'chicken-momos',Image:"https://i.pinimg.com/736x/33/16/ed/3316edd2538362f3e6efd67f3b8a5e29.jpg" },
  { id: 'drink1', name: 'Refreshing Limca', price: 2.50, description: 'A zesty and lemony lime drink to quench your thirst.', rating: 4.0, category: 'drinks', tags: ['Drinks', 'Beverage'], imageSlug: 'limca-drink',Image:"https://i.pinimg.com/736x/43/e2/0c/43e20c7f5fd9f428c2669a080f7c6ef3.jpg" },
  { id: 'drink2', name: 'Classic Coke', price: 2.50, description: 'The original taste of Coca-Cola.', rating: 4.1, category: 'drinks', tags: ['Drinks', 'Beverage', 'Cold Drink'], imageSlug: 'coke-drink',Image:"https://i.pinimg.com/736x/02/e9/48/02e948b67e8039ddb2abe640c67f1223.jpg" },
];

const mockCategoriesList = [
  { name: 'All Items', slug: 'all' },
  { name: 'Burgers', slug: 'burgers' },
  { name: 'Pizzas', slug: 'pizzas' },
  { name: 'Biryani', slug: 'biryani' },
  { name: 'Noodles & Pasta', slug: 'noodles-pasta' },
  { name: 'Momos', slug: 'momos' },
  { name: 'Salads', slug: 'salads' },
  { name: 'Drinks', slug: 'drinks' },
];


const FoodMenuPage = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');

  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(categorySlug || 'all');
  const [isLoading, setIsLoading] = useState(true);

  const pageTitle = mockCategoriesList.find(cat => cat.slug === activeCategory)?.name || 'Menu';

  useEffect(() => {
    setIsLoading(true);
    let items = allMockFoodItems;

    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }

    if (filterParam === 'featured') {
      items = items.filter(item => item.isNew || (item.rating && item.rating >= 4.5));
    }
    
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    setTimeout(() => {
      setDisplayedItems(items);
      setIsLoading(false);
    }, 300);
  }, [activeCategory, searchTerm, filterParam]);

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const listVariants = {
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
  };

  return (
    <motion.div 
      className="section-padding-food pt-24 md:pt-28 min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container-food">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 md:mb-12"
        >
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors">
            <ArrowLeft size={18} className="mr-2"/> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Our <span className="gradient-text-food">{pageTitle}</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Discover a wide range of delicious options. Filter by category or search for your cravings!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="relative flex-grow">
            <Input 
              type="text"
              placeholder="Search for dishes, e.g., 'Spicy Burger' or 'Pizza'"
              className="search-input-food !py-3.5 !pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            {searchTerm && (
              <Button variant="ghost" size="icon" onClick={() => setSearchTerm('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                <X size={18} />
              </Button>
            )}
          </div>
          <Button variant="outline" className="button-food-outline md:w-auto w-full !py-3.5">
            <Filter size={18} className="mr-2" /> Filters
          </Button>
        </div>
        
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {mockCategoriesList.map(cat => (
              <Button
                key={cat.slug}
                variant={activeCategory === cat.slug ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`${activeCategory === cat.slug ? 'button-food-primary' : 'button-food-outline !border-border hover:!border-primary/50'}`}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>


        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="food-item-card animate-pulse">
                <div className="aspect-[4/3] bg-muted/30 rounded-t-2xl"></div>
                <div className="p-5">
                  <div className="h-6 w-3/4 bg-muted/30 rounded mb-2"></div>
                  <div className="h-4 w-full bg-muted/30 rounded mb-1"></div>
                  <div className="h-4 w-5/6 bg-muted/30 rounded mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-1/3 bg-muted/30 rounded"></div>
                    <div className="h-10 w-1/4 bg-muted/30 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-16"
          >
            <Utensils size={64} className="mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-semibold mb-2">No Dishes Found</h2>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find any dishes matching your criteria. Try a different search or category!
            </p>
            <Button asChild className="button-food-primary">
              <Link to="/menu">View Full Menu</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedItems.map((item, index) => (
              <FoodItemCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FoodMenuPage;
