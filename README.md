# StreetFood

A modern, responsive street food ordering website built with HTML, CSS, and JavaScript. Discover and order delicious street food from various categories including breakfast, lunch, dinner, and snacks.

## Features

- **Browse Categories**: Explore food items across Breakfast, Lunch, Dinner, and Snacks categories
- **Interactive Cart**: Add items to cart, adjust quantities, and view real-time totals
- **Persistent Cart**: Cart data is saved in localStorage for seamless browsing
- **Checkout System**: Review your order and proceed to checkout
- **Responsive Design**: Optimized for desktop and mobile devices
- **Detailed Food Pages**: Click on any food item for vendor details, pricing, and contact information

## Technologies Used

- **HTML5**: Structure and markup
- **CSS3**: Styling with Bootstrap framework
- **JavaScript**: Interactive functionality and cart management
- **Bootstrap 5**: Responsive design components
- **LocalStorage**: Client-side data persistence

## Project Structure

```
StreetFood-main/
├── home.html              # Main landing page
├── Breakfast.html         # Breakfast category page
├── Lunch.html             # Lunch category page
├── Dinner.html            # Dinner category page
├── snacks.html            # Snacks category page
├── checkout.html          # Order checkout page
├── login.html             # User login page
├── register.html          # User registration page
├── style.css              # Main stylesheet
├── javascript/js/script.js # Main JavaScript file
├── Categories/            # Food category directories
│   ├── Breakfast/
│   ├── lunch/
│   ├── dinner/
│   └── snacks/
├── images/                # Food images and assets
└── README.md              # Project documentation
```

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/StreetFood.git
   cd StreetFood
   ```

2. **Open the website**:
   - Open `home.html` in your web browser
   - Or use a local server for better experience:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve .
     ```

3. **Navigate the site**:
   - Browse food categories from the home page
   - Click on food items to view details
   - Add items to cart and proceed to checkout

## Cart Functionality

- Click the "Add to Cart" button on any food item
- View cart by clicking the "Cart" button in the navbar
- Adjust quantities using + and - buttons
- Cart persists across page refreshes
- Proceed to checkout when ready

## Contact

For questions or suggestions, feel free to open an issue or contact the maintainers.
