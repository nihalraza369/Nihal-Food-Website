
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/FoodCartContext';
import FoodItemCard from '@/components/food/FoodItemCard';
import { ArrowLeft, PlusCircle, MinusCircle, Star, ShoppingCart, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

// Using the same mock data as MenuPage for consistency
const allMockFoodItems = [
  { id: 'burger1', name: 'Classic Cheeseburger', price: 8.99, description: 'Juicy beef patty, melted cheddar, lettuce, tomato, and our special sauce. A timeless favorite that hits all the right spots.', rating: 4.5, category: 'burgers', tags: ['Burger', 'Beef'], isNew: true, imageSlug: 'classic-cheeseburger', ingredients: ['Beef Patty', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Special Sauce', 'Sesame Bun'], calories: 550,image:"https://i.pinimg.com/736x/cb/57/cd/cb57cd9866688af0ddbca027d791aafc.jpg" },
  { id: 'burger2', name: 'Spicy Chicken Burger', price: 9.49, description: 'Crispy chicken fillet, spicy mayo, jalapenos, and lettuce. For those who like a kick!', rating: 4.6, category: 'burgers', tags: ['Burger', 'Chicken', 'Spicy'], imageSlug: 'spicy-chicken-burger', ingredients: ['Chicken Fillet', 'Spicy Mayo', 'Jalapenos', 'Lettuce', 'Brioche Bun'], calories: 620,image:"https://i.pinimg.com/736x/8c/e4/46/8ce4466288166b7050ab4cb40610db55.jpg" },
  { id: 'pizza1', name: 'Pepperoni Feast Pizza', price: 12.50, description: 'Loaded with spicy pepperoni and mozzarella on a crispy crust. A true classic for pizza lovers.', rating: 4.8, category: 'pizzas', tags: ['Pizza', 'Pepperoni'], imageSlug: 'pepperoni-pizza', ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Pepperoni'], calories: 300 ,image:"https://i.pinimg.com/736x/4d/a7/3f/4da73f313deef52c2373795a970b4082.jpg" },
  { id: 'pizza2', name: 'Margherita Pizza', price: 10.00, description: 'Classic delight with fresh mozzarella, tomatoes, and basil. Simple, yet incredibly delicious.', rating: 4.4, category: 'pizzas', tags: ['Pizza', 'Vegetarian'], imageSlug: 'margherita-pizza', ingredients: ['Pizza Dough', 'Tomato Sauce', 'Fresh Mozzarella', 'Tomatoes', 'Basil'], calories: 250 ,image:"https://i.pinimg.com/736x/a6/34/c8/a634c8e44a0cc72bd6ae9b345678448a.jpg" },
  { id: 'biryani1', name: 'Chicken Dum Biryani', price: 10.99, description: 'Aromatic basmati rice cooked with tender chicken and exotic spices, sealed and slow-cooked to perfection.', rating: 4.7, category: 'biryani', tags: ['Biryani', 'Chicken'], imageSlug: 'chicken-biryani', ingredients: ['Basmati Rice', 'Chicken', 'Yogurt', 'Onions', 'Mixed Spices', 'Saffron'], calories: 700,image:"https://i.pinimg.com/736x/be/04/a8/be04a81dd02f8802bcc92c67cc713a98.jpg" },
  { id: 'noodles1', name: 'Spicy Schezwan Noodles', price: 9.50, description: 'Stir-fried noodles with vegetables in a fiery Schezwan sauce. A perfect blend of heat and flavor.', rating: 4.3, category: 'noodles-pasta', tags: ['Noodles', 'Spicy', 'Vegetarian'], isNew: true, imageSlug: 'schezwan-noodles', ingredients: ['Noodles', 'Mixed Vegetables', 'Schezwan Sauce', 'Soy Sauce', 'Garlic', 'Ginger'], calories: 450,image:"https://i.pinimg.com/736x/97/e4/85/97e4856ba70e69e56d3d45b987260a6a.jpg" },
  { id: 'pasta1', name: 'Creamy Alfredo Pasta', price: 11.00, description: 'Fettuccine pasta in a rich and creamy Alfredo sauce with grilled chicken. Pure comfort food.', rating: 4.6, category: 'noodles-pasta', tags: ['Pasta', 'Chicken'], imageSlug: 'alfredo-pasta', ingredients: ['Fettuccine', 'Heavy Cream', 'Parmesan Cheese', 'Grilled Chicken', 'Garlic', 'Butter'], calories: 800 ,image:"https://i.pinimg.com/736x/53/fa/8f/53fa8fec3f81a17aa318bd5be491b193.jpg"},
  { id: 'salad1', name: 'Fresh Garden Salad', price: 7.25, description: 'Crisp lettuce, tomatoes, cucumbers, carrots, and a light vinaigrette. Healthy and refreshing.', rating: 4.2, category: 'salads', tags: ['Salad', 'Vegetarian', 'Healthy'], imageSlug: 'garden-salad', ingredients: ['Lettuce', 'Tomatoes', 'Cucumbers', 'Carrots', 'Bell Peppers', 'Vinaigrette'], calories: 150 ,image:"https://i.pinimg.com/736x/39/ca/a3/39caa3f2791dc35df47947e34f502283.jpg"},
  { id: 'momo1', name: 'Steamed Chicken Momos', price: 6.99, description: 'Delicious steamed dumplings filled with seasoned minced chicken. Served with a tangy dipping sauce.', rating: 4.9, category: 'momos', tags: ['Momos', 'Chicken'], imageSlug: 'chicken-momos', ingredients: ['Minced Chicken', 'Flour Dough', 'Onion', 'Ginger', 'Garlic', 'Spices'], calories: 300 ,image:"https://i.pinimg.com/736x/33/16/ed/3316edd2538362f3e6efd67f3b8a5e29.jpg"},
  { id: 'drink1', name: 'Refreshing Limca', price: 2.50, description: 'A zesty and lemony lime drink to quench your thirst. "Lime n Lemoni" goodness.', rating: 4.0, category: 'drinks', tags: ['Drinks', 'Beverage'], imageSlug: 'limca-drink', ingredients: ['Carbonated Water', 'Sugar', 'Lime Juice Concentrate', 'Lemon Juice Concentrate'], calories: 120,image:"https://i.pinimg.com/736x/43/e2/0c/43e20c7f5fd9f428c2669a080f7c6ef3.jpg" },
  { id: 'drink2', name: 'Classic Coke', price: 2.50, description: 'The original taste of Coca-Cola. Enjoy the classic refreshment.', rating: 4.1, category: 'drinks', tags: ['Drinks', 'Beverage', 'Cold Drink'], imageSlug: 'coke-drink', ingredients: ['Carbonated Water', 'High Fructose Corn Syrup', 'Caramel Color', 'Phosphoric Acid', 'Natural Flavors', 'Caffeine'], calories: 140,image:"https://i.pinimg.com/736x/02/e9/48/02e948b67e8039ddb2abe640c67f1223.jpg" },
];

const FoodItemDetailsPage = () => {
  const { itemId } = useParams();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedItems, setRelatedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const foundItem = allMockFoodItems.find(food => food.id === itemId);
    setItem(foundItem);

    if (foundItem) {
      const related = allMockFoodItems.filter(
        relItem => relItem.category === foundItem.category && relItem.id !== foundItem.id
      ).slice(0, 4);
      setRelatedItems(related);
    }
    
    setQuantity(1); // Reset quantity when item changes
    setTimeout(() => setIsLoading(false), 200);
    window.scrollTo(0, 0);
  }, [itemId]);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="section-padding-food pt-24 md:pt-32 min-h-screen container-food">
        <div className="animate-pulse">
          <div className="h-8 w-1/4 bg-muted/30 rounded mb-10"></div>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="aspect-square bg-muted/30 rounded-2xl"></div>
            <div>
              <div className="h-10 w-3/4 bg-muted/30 rounded mb-4"></div>
              <div className="h-6 w-1/2 bg-muted/30 rounded mb-3"></div>
              <div className="h-20 w-full bg-muted/30 rounded mb-6"></div>
              <div className="h-8 w-1/4 bg-muted/30 rounded mb-6"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-32 bg-muted/30 rounded-lg"></div>
                <div className="h-12 w-40 bg-muted/30 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="section-padding-food pt-24 md:pt-32 min-h-screen container-food text-center">
        <Utensils size={64} className="mx-auto text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">Oops! Dish Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the delicious dish you were looking for.</p>
        <Button asChild className="button-food-primary">
          <Link to="/menu">Explore Full Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className="section-padding-food pt-24 md:pt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-food">
        <Link to="/menu" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform"/> Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div 
            className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img  
              alt={item.name} 
              className="w-full h-full object-cover"
             src={`${item.image}`} />
            {item.isNew && (
              <span className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Zap size={16} /> NEW
              </span>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Link to={`/menu/${item.category}`} className="text-sm font-semibold text-primary uppercase tracking-wider hover:underline">{item.category}</Link>
            <h1 className="text-4xl md:text-5xl font-black my-2 gradient-text-food">{item.name}</h1>
            
            {item.rating && (
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                {[...Array(Math.floor(item.rating))].map((_, i) => <Star key={i} size={20} fill="currentColor"/>)}
                {item.rating % 1 !== 0 && <Star size={20} fill="currentColor" style={{clipPath: `inset(0 ${100 - (item.rating % 1)*100}% 0 0)`}} />}
                {[...Array(5 - Math.ceil(item.rating))].map((_, i) => <Star key={`empty-${i}`} size={20} className="text-gray-300"/>)}
                <span className="ml-2 text-muted-foreground text-sm">({item.rating.toFixed(1)})</span>
              </div>
            )}

            <p className="text-foreground/80 text-lg mb-6 leading-relaxed">{item.description}</p>
            
            <p className="text-4xl font-extrabold text-primary mb-8">${item.price.toFixed(2)}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} className="text-primary hover:bg-primary/10 rounded-r-none">
                  <MinusCircle size={22} />
                </Button>
                <span className="px-5 text-lg font-semibold w-16 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} className="text-primary hover:bg-primary/10 rounded-l-none">
                  <PlusCircle size={22} />
                </Button>
              </div>
              <Button size="lg" className="button-food-primary flex-grow sm:flex-grow-0 !text-base !py-3.5" onClick={handleAddToCart}>
                <ShoppingCart size={20} className="mr-2.5" /> Add to Cart
              </Button>
            </div>

            {item.ingredients && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
                <p className="text-sm text-muted-foreground">{item.ingredients.join(', ')}.</p>
              </div>
            )}
            {item.calories && (
              <div>
                <h3 className="text-lg font-semibold mb-1">Nutritional Info (approx.):</h3>
                <p className="text-sm text-muted-foreground">{item.calories} calories per serving.</p>
              </div>
            )}
          </motion.div>
        </div>

        {relatedItems.length > 0 && (
          <div className="mt-20 md:mt-28">
            <h2 className="text-3xl font-bold mb-8 text-center md:text-left">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedItems.map((relatedItem, index) => (
                <FoodItemCard key={relatedItem.id} item={relatedItem} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FoodItemDetailsPage;
