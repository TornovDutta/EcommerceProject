# 📚 CodeBook - E-Commerce Platform for Programming Books

CodeBook is a modern, full-featured e-commerce web application for browsing and purchasing programming books. Built with React and powered by a JSON Server backend with authentication, it offers a seamless shopping experience with user authentication, cart management, and order tracking.

## ✨ Features

### 🔐 User Authentication
- User registration with secure authentication
- Login/logout functionality
- Protected routes for authenticated users
- Persistent session management using Redux

### 🛒 Shopping Experience
- Browse extensive collection of programming books
- Detailed product pages with ratings and descriptions
- Advanced product filtering and search
- Best seller highlights
- Real-time stock status

### 🛍️ Cart & Checkout
- Add/remove items from shopping cart
- Dynamic cart updates
- Secure checkout process
- Order summary and confirmation
- Order history dashboard

### 📊 User Dashboard
- View order history
- Track order details
- Manage user profile
- View purchased products

### 🎨 Modern UI/UX
- Responsive design with TailwindCSS
- Dark mode support
- Toast notifications for user feedback
- Smooth scrolling and navigation
- Clean, intuitive interface

## 🚀 Technology Stack

### Frontend
- **React** (v19.2.4) - UI library
- **React Router DOM** (v6.30.3) - Client-side routing
- **Redux Toolkit** (v2.11.2) - State management
- **React Redux** (v9.2.0) - React bindings for Redux
- **TailwindCSS** (v3.4.19) - Utility-first CSS framework
- **React Toastify** (v11.0.5) - Notification system

### Backend
- **JSON Server** (v0.17.4) - Mock REST API
- **JSON Server Auth** (v2.1.0) - Authentication middleware

### Testing
- **React Testing Library** - Component testing
- **Jest** - Test runner

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/TornovDutta/EcommerceProject.git
   cd EcommerceProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the JSON Server (Backend)**
   
   Open a terminal and run:
   ```bash
   npm run server
   ```
   
   The server will start on `http://localhost:8000`

4. **Start the React App (Frontend)**
   
   Open another terminal and run:
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

## 🎯 Usage

### Running the Application

1. **Start Backend Server First**
   ```bash
   npm run server
   ```
   This starts the JSON Server on port 8000 with authentication middleware.

2. **Start Frontend Application**
   ```bash
   npm start
   ```
   Opens the React app at http://localhost:3000

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Start** | `npm start` | Runs the app in development mode |
| **Server** | `npm run server` | Starts JSON Server backend with authentication |
| **Build** | `npm run build` | Builds the app for production |
| **Test** | `npm test` | Launches the test runner |
| **Eject** | `npm run eject` | Ejects from Create React App (one-way operation) |

## 📁 Project Structure

```
codebook/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Element/       # UI elements (Cards, etc.)
│   │   ├── Layout/        # Layout components (Header, Footer)
│   │   └── Other/         # Utility components (ScrollToTop)
│   ├── pages/             # Page components
│   │   ├── Home/          # Home page
│   │   ├── products/      # Products listing
│   │   ├── cart/          # Cart and Checkout
│   │   ├── order/         # Order pages
│   │   └── DashBoard/     # User dashboard
│   ├── routers/           # Route definitions
│   ├── store/             # Redux store and slices
│   │   ├── store.js       # Redux store configuration
│   │   ├── authSlice.js   # Authentication state
│   │   └── cartSlice.js   # Shopping cart state
│   ├── App.js             # Root component
│   └── index.js           # Entry point
├── data/
│   └── db.json            # JSON Server database
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # TailwindCSS configuration
└── README.md              # Project documentation
```

## 🗄️ Database Structure

The JSON Server uses `data/db.json` with the following collections:

### Products
- **id**: Unique product identifier
- **name**: Book title
- **overview**: Short description
- **long_description**: Detailed description
- **price**: Product price
- **poster**: Image URL
- **rating**: Product rating (0-5)
- **in_stock**: Availability status
- **best_seller**: Best seller flag

### Users
Registered user accounts (managed by json-server-auth)

### Orders
User purchase history and order details

## 🔑 API Endpoints

The JSON Server Auth middleware provides the following endpoints:

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /600/users/:id` - Get user profile (authenticated)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /products?_sort=price&_order=asc` - Filter/sort products

### Orders
- `GET /660/orders` - Get user orders (authenticated)
- `POST /660/orders` - Create new order (authenticated)
- `GET /660/orders/:id` - Get order details (authenticated)

> **Note:** Routes with `660` prefix require authentication token in request headers.

## 🛠️ Development

### Key Dependencies

- **@reduxjs/toolkit** - Redux state management simplified
- **react-router-dom** - Declarative routing
- **json-server-auth** - JWT-based authentication for JSON Server
- **react-toastify** - User-friendly notifications

### State Management

The application uses Redux Toolkit with the following slices:

1. **authSlice** - Manages user authentication state
2. **cartSlice** - Manages shopping cart state

### Routing

Protected routes are implemented using React Router DOM to ensure authenticated access to user-specific pages like Dashboard and Orders.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The project uses React Testing Library for component testing.

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized static files ready for deployment.

## 📝 Notes

- The proxy in `package.json` forwards API requests to the JSON Server on port 8000
- Authentication tokens are managed via json-server-auth middleware
- The app supports both light and dark modes
- All images use Unsplash placeholder URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Happy Coding!** 🚀
