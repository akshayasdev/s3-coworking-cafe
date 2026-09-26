import { useState } from "react";
import { Plus } from "lucide-react";
import { useCart } from "../../context/useCart.js";
import "./CafeMenu.css";

const categories = [
  "All",
  "Coffee",
  "Tea",
  "Breakfast",
  "Snacks",
  "Desserts",
];

const menuItems = [
  {
    id: 1,
    name: "Cappuccino",
    description: "Rich espresso with steamed milk and creamy foam.",
    price: 149,
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Café Latte",
    description: "Smooth espresso blended with silky steamed milk.",
    price: 159,
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Americano",
    description: "Bold espresso with hot water.",
    price: 129,
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Masala Chai",
    description: "Traditional Indian tea with aromatic spices.",
    price: 99,
    category: "Tea",
    image:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Green Tea",
    description: "Light and refreshing green tea.",
    price: 89,
    category: "Tea",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Avocado Toast",
    description: "Toasted sourdough topped with creamy avocado.",
    price: 229,
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Classic Pancakes",
    description: "Fluffy pancakes served with honey and fruits.",
    price: 199,
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Veg Sandwich",
    description: "Fresh vegetables and cheese in toasted bread.",
    price: 179,
    category: "Snacks",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "French Fries",
    description: "Crispy golden fries served with a creamy dip.",
    price: 149,
    category: "Snacks",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie with a fudgy center.",
    price: 169,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Cheesecake",
    description: "Creamy cheesecake with a buttery biscuit base.",
    price: 199,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Chocolate Muffin",
    description: "Soft chocolate muffin with chocolate chips.",
    price: 129,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&q=80",
  },
];

function CafeMenu() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get addToCart from our cart context
  const { addToCart } = useCart();

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === activeCategory
        );

  return (
    <section className="cafe-menu-section" id="cafe">
      <div className="cafe-menu-container">

        {/* Header */}
        <div className="cafe-menu-heading">
          <span>S3 CAFÉ</span>

          <h2>
            Fuel Your <strong>Focus.</strong>
          </h2>

          <p>
            Fresh coffee, delicious food and everything you
            need to keep your workday going.
          </p>
        </div>

        {/* Categories */}
        <div className="menu-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category ? "active" : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu */}
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div className="menu-card" key={item.id}>

              {/* Image */}
              <div className="menu-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Content */}
              <div className="menu-card-content">

                <div className="menu-card-header">
                  <h3>{item.name}</h3>

                  <span>
                    ₹{item.price}
                  </span>
                </div>

                <p>
                  {item.description}
                </p>

                {/* Add to Order */}
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(item)}
                >
                  <Plus size={16} />
                  Add to Order
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CafeMenu;