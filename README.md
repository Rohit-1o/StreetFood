# StreetFood

StreetFood is a modern, responsive food ordering website for discovering and ordering delicious street food from Breakfast, Lunch, Dinner, and Snacks categories. The project now includes a polished client-side shopping experience with cart, checkout, order history, and product detail pages.

## ✨ New Features

- Responsive homepage and category pages for desktop, tablet, and mobile
- Product cards with dedicated product detail pages
- Add-to-cart flow with quantity controls and live cart totals in Indian Rupees
- Cart drawer with checkout and payment experience
- User login and sign-up flow with local storage persistence
- Orders page to view previous purchases
- Order confirmation success page
- Smooth navigation with back buttons and a scroll-to-top button

## 🛠️ Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- LocalStorage for client-side persistence

## 📁 Project Structure

```text
StreetFood-main/
├── home.html                  # Landing page
├── Breakfast.html             # Breakfast category page
├── Lunch.html                 # Lunch category page
├── Dinner.html                # Dinner category page
├── snacks.html                # Snacks category page
├── product-details.html       # Shared product detail page
├── orders.html                # User order history page
├── order-success.html         # Order confirmation page
├── login.html                 # Login page
├── register.html              # Registration page
├── style.css                  # Main stylesheet
├── javascript/js/script.js    # Shared cart, auth, and UI logic
├── Categories/                # Category-specific food pages
├── images/                    # Food and branding assets
└── README.md                  # Project documentation
```

## ▶️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Rohit-1o/StreetFood.git
   cd StreetFood
   ```

2. Start a local server:
   ```bash
   python -m http.server 8000
   ```

3. Open the project in your browser:
   - Visit http://127.0.0.1:8000/home.html

## 🛍️ User Flow

- Browse categories from the homepage
- Click a food card to view its product details
- Add items to the cart from the detail page or cart icon
- Adjust quantity, review the cart, and proceed to payment
- Complete checkout and view your order confirmation

## 📝 Notes

This version is a front-end demo and uses browser local storage for cart, login, and orders data.
