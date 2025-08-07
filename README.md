# RuralConnect - Rural Community Services Platform

A full-stack web application helping rural communities easily find and access essential products like groceries, medicines, and key support services.

## 🌐 Live Demo
**🚀 [View Live Application](https://djharish795.github.io/Rural-connect--Adore)**

*Note: The live demo runs in static mode with sample data. All UI features work perfectly, including login/signup (demo mode), dashboard, and profile editing. For full backend functionality, please run the application locally.*

## 🚀 Tech Stack Used

- **Frontend:** React.js with React Router
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS3 with responsive design
- **HTTP Client:** Axios

## 📋 Features Covered

### Homepage Features
- ✅ Responsive navbar with logo and navigation links
- ✅ Our Services section (5 services: Grocery Delivery, Medicine Supply, Bill Payments, Agri-Support, Health Checkup)
- ✅ Available Products section (6+ products with names, prices, and search functionality)
- ✅ News & Updates section with rural community headlines
- ✅ Contact Us section with address, helpline, and contact form
- ✅ Fully responsive design for mobile and desktop

### User Authentication & Features
- ✅ User registration and login system
- ✅ Protected user dashboard
- ✅ Profile editing functionality
- ✅ JWT-based authentication
- ✅ Secure password hashing with bcrypt

### Backend API Endpoints
- ✅ `GET /api/services` - List of service types
- ✅ `GET /api/products` - List of products with details
- ✅ `POST /api/register` - User registration
- ✅ `POST /api/login` - User login
- ✅ `GET /api/news` - Return news headlines
- ✅ `POST /api/contact` - Store contact form submissions
- ✅ `POST /api/bookings` - Create user bookings
- ✅ `GET /api/bookings/:userId` - Fetch user bookings
- ✅ `PUT /api/profile` - Update user profile

### Booking & Extra Features
- ✅ Service booking system for products
- ✅ Bookings saved in database and displayed on user dashboard
- ✅ Product search and filter functionality
- ✅ User profile management

## 🏃‍♂️ How to Run the App Locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5001`

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## 🔐 Demo Login

You can create a new account using the signup form, or use these test credentials if available:
- **Email:** demo@ruralconnect.com
- **Password:** demo123

## 📁 Project Structure

```
rural-connect/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Express backend
│   ├── middleware/         # Auth middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Server entry point
│   └── package.json
└── README.md
```

## 🌟 Key Highlights

- **Responsive Design:** Works seamlessly on mobile and desktop
- **Secure Authentication:** JWT-based auth with password hashing
- **Database Integration:** MongoDB with proper data modeling
- **Search Functionality:** Real-time product search and filtering
- **User Experience:** Clean, intuitive interface designed for rural communities
- **RESTful API:** Well-structured backend API endpoints
- **Error Handling:** Comprehensive error handling and user feedback

## 🚀 Future Enhancements

- Payment gateway integration
- Real-time order tracking
- SMS notifications for rural users
- Multi-language support
- Mobile app development
- Inventory management system

---

**Developed for rural community empowerment** 🌾
