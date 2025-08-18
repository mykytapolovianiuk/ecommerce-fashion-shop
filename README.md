# 🛒 FASCO Checkout (React + TypeScript + Firebase + Stripe)

This project is a **demo e-commerce checkout system** built with **React, TypeScript, Firebase, and Stripe**.  
It provides a modern shopping experience with **cart management**, **checkout flow**, and **secure payment processing** powered by **Stripe Payment Elements**.

---

## 🚀 Features

- **Product Management**
  - Products and categories stored in **Firebase Firestore**
  - Real-time updates and filtering by categories
  - Cart persistence using Firebase and local state

- **Shopping Cart**
  - Add/remove products
  - Update product quantities
  - Automatic subtotal & total calculation

- **Checkout Page**
  - Contact form with email input  
  - Delivery information (country, address, city, postal code)  
  - Payment form powered by **Stripe Payment Element**  
  - Option to apply discount codes  
  - Shipping cost calculation  

- **Stripe Payment Integration**
  - Secure payments with **Stripe Elements**
  - PaymentIntent created via **Firebase Functions**
  - Support for test cards and multiple payment methods
  - Error handling and payment status confirmation

---

## 🛠️ Tech Stack

- **Frontend**
  - [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)  
  - [Vite](https://vitejs.dev/)  
  - [Tailwind CSS](https://tailwindcss.com/)  

- **Backend**
  - [Firebase Firestore](https://firebase.google.com/docs/firestore)  
  - [Firebase Hosting](https://firebase.google.com/docs/hosting)  
  - [Firebase Functions](https://firebase.google.com/docs/functions)  

- **Payments**
  - [Stripe](https://stripe.com/) with **Payment Element**  

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
Install dependencies

npm install


Configure environment variables
Create a .env file in the root:

VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

🔥 Firebase Functions Setup

Go to functions/ folder:

cd functions
npm install


Set Stripe secret key:

firebase functions:config:set stripe.secret="sk_test_your_secret_key"


Deploy functions:

firebase deploy --only functions

▶️ Run the project
npm run dev     # Start locally
npm run build   # Build for production


App will be available at:
👉 http://localhost:5173/

💳 Test Payments

You can use Stripe test cards during development. For example:

Card Number: 4242 4242 4242 4242
Expiration Date: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits

📂 Project Structure
.
```├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Auth and cart context providers
│   ├── pages/            # Home, Products, Cart, Checkout pages
│   ├── hooks/            # Custom React hooks
│   └── App.tsx           # Main app entry
├── functions/            # Firebase Cloud Functions
│   └── index.js          # Stripe payment endpoint
├── public/               # Static assets
├── .env                  # Environment variables
└── package.json
```

📌 Roadmap
```
✅ Shopping cart & checkout

✅ Stripe integration

🔄 Save order history in Firestore

🔄 Add user authentication (Firebase Auth)

🔄 Admin panel for product management
```

📜 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it with attribution.

✅ Repository Description (for GitHub)
