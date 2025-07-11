const menuItems = [
  // ☕ Coffee
  {
    id: 1,
    name: "Cappuccino",
    category: "Coffee",
    price: 120,
    rating: 4.5,
    available: true,
    tags: ["hot", "milk", "espresso"],
    image: "https://methodicalcoffee.com/cdn/shop/articles/cap.jpg?v=1684507364",
    description: "A smooth blend of espresso and steamed milk, topped with a creamy froth for the perfect balance of strength and softness.",
    chefWord: "We crafted this cappuccino to be your cozy companion — bold, milky, and satisfyingly warm.",
    customOptions: ["Strong", "Less Strong", "No Calorie"]
  },
  {
    id: 2,
    name: "Cold Brew",
    category: "Coffee",
    price: 150,
    rating: 4.2,
    available: true,
    tags: ["cold", "strong", "black"],
    image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/French-Press-Cold-Brew-011.jpg",
    description: "A bold and smooth cold coffee, steeped slowly overnight to bring out deep flavors with low acidity.",
    chefWord: "Brewed for over 12 hours, this cold brew is a powerhouse of flavor — perfect for coffee lovers who like it strong and chilled."
  },
  {
    id: 3,
    name: "Mocha Frappe",
    category: "Coffee",
    price: 180,
    rating: 4.6,
    available: false,
    tags: ["chocolate", "iced", "sweet"],
    image: "https://abeautifulmess.com/wp-content/uploads/2023/04/best-mocha-frappe.jpg",
    description: "An indulgent blend of coffee and chocolate, blended with ice and topped with whipped cream.",
    chefWord: "When coffee meets dessert — our Mocha Frappe is a delightful dance of bold and sweet."
  },

  // 🍛 Main Dish
  {
    id: 4,
    name: "Paneer Butter Masala",
    category: "Main Dish",
    price: 220,
    rating: 4.8,
    available: true,
    tags: ["paneer", "spicy", "gravy"],
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/07/paneer-butter-masala-recipe.webp",
    description: "Cottage cheese cubes simmered in a rich, buttery tomato gravy with aromatic spices.",
    chefWord: "This is comfort food at its finest — velvety, flavorful, and made with love in every bite."
  },
  {
    id: 5,
    name: "Veg Biryani",
    category: "Main Dish",
    price: 200,
    rating: 4.4,
    available: true,
    tags: ["rice", "spicy", "north indian"],
    image: "https://i.ytimg.com/vi/Do7ZdUodDdw/maxresdefault.jpg",
    description: "A fragrant rice dish cooked with fresh vegetables, herbs, and traditional spices.",
    chefWord: "Every spoonful of this biryani brings together the soul of Indian spices and home-cooked warmth.",
    customOptions: ["0.5 Kg", "1 Kg", "1.5 Kg", "2 Kg"]
  },
  {
    id: 6,
    name: "Grilled Sandwich",
    category: "Main Dish",
    price: 130,
    rating: 4.1,
    available: false,
    tags: ["bread", "cheese", "quick bite"],
    image: "https://static.toiimg.com/thumb/54714340.cms?imgsize=458099&width=800&height=800",
    description: "Crispy golden bread with a savory cheesy filling — toasted to perfection.",
    chefWord: "Simple, satisfying, and packed with flavor — our grilled sandwich is the perfect midday rescue."
  },

  // 🍟 Snacks
  {
    id: 7,
    name: "French Fries",
    category: "Snacks",
    price: 90,
    rating: 4.0,
    available: true,
    tags: ["crispy", "potato", "finger food"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdU6PILG8sKcDKNYZ2vwb3UfH-zOcinAP82w&s",
    description: "Golden, crispy fries made from premium potatoes and lightly salted.",
    chefWord: "Crisp on the outside, fluffy inside — the ultimate anytime snack straight from our fryer."
  },
  {
    id: 8,
    name: "Cheese Balls",
    category: "Snacks",
    price: 110,
    rating: 4.3,
    available: true,
    tags: ["cheesy", "fried", "snack"],
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/cheese-balls.webp",
    description: "Crispy on the outside, gooey cheese on the inside — these balls are made to please.",
    chefWord: "Bite-sized joy! These cheese balls are our go-to guilty pleasure — creamy, crunchy, and addictive."
  },
  {
    id: 9,
    name: "Masala Nachos",
    category: "Snacks",
    price: 140,
    rating: 4.2,
    available: true,
    tags: ["mexican", "crunchy", "dip"],
    image: "https://naturallynidhi.com/wp-content/uploads/2025/02/Loaded-Plantain-Nachos-1.jpg",
    description: "Crispy nachos layered with spicy masala, fresh veggies, and cheese.",
    chefWord: "Our twist on a classic — Indian-style nachos that crunch with bold flavor in every bite."
  },

  // 🍰 Desserts
  {
    id: 10,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: 160,
    rating: 4.9,
    available: true,
    tags: ["chocolate", "cake", "dessert"],
    image: "https://daddysbakery.in/wp-content/uploads/2019/01/Choco-Lava-Cake.jpg",
    description: "Warm chocolate cake with a molten, gooey center — decadence in every spoonful.",
    chefWord: "For true dessert lovers — the soft cake outside hides a river of rich, flowing chocolate inside."
  },
  {
    id: 11,
    name: "Strawberry Cheesecake",
    category: "Desserts",
    price: 180,
    rating: 4.7,
    available: true,
    tags: ["sweet", "cheese", "berry"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw41-uke-RL1bA_2BNDbxUDBOqOVYG76WAtg&s",
    description: "Creamy cheesecake with a graham crust, topped with fresh strawberry glaze.",
    chefWord: "We finish this with a sweet, tart strawberry topping for the perfect balance of flavor and texture."
  },
  {
    id: 12,
    name: "Brownie Sundae",
    category: "Desserts",
    price: 150,
    rating: 4.6,
    available: false,
    tags: ["ice cream", "brownie", "sweet"],
    image: "https://dirtydishesmessykisses.com/wp-content/uploads/2024/10/brownie-sundae-recipe-1730416956.jpg",
    description: "Warm brownie paired with vanilla ice cream, drizzled in chocolate syrup.",
    chefWord: "Hot meets cold in this ultimate dessert — a gooey brownie topped with cool, creamy delight."
  },

  // 🍹 Drinks
  {
    id: 13,
    name: "Lemon Iced Tea",
    category: "Drinks",
    price: 90,
    rating: 4.1,
    available: true,
    tags: ["refreshing", "lemon", "cold"],
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/8c/b2/a5/ice-lemon-tea.jpg",
    description: "Chilled black tea infused with fresh lemon — light, zesty, and revitalizing.",
    chefWord: "This iced tea is our summer favorite — tangy, cool, and just the right amount of sweet.",
    customOptions: ["Small", "Medium", "Large"]
  },
  {
    id: 14,
    name: "Mango Smoothie",
    category: "Drinks",
    price: 130,
    rating: 4.4,
    available: true,
    tags: ["mango", "smoothie", "summer"],
    image: "https://www.eatloveeats.com/wp-content/uploads/2023/04/Orange-Mango-Smoothie-Featured.jpg",
    description: "A tropical smoothie made with ripe mangoes, yogurt, and a hint of honey.",
    chefWord: "We blend only the juiciest mangoes to bring you this creamy, sunshine-filled treat.",
    customOptions: ["Small", "Medium", "Large"]
  }
];

export default menuItems;