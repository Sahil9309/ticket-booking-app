# 🏠 NestQuest

NestQuest is a full-stack web application. It allows users to rent out their property as hosts and also book places to stay as guests.

## 🚀 Features

- User authentication (sign-up/login)
- Property listing for hosts
- Place booking functionality for guests
- Secure API with JWT and cookies
- Responsive and modern UI

## 🛠 Tech Stack

- **Frontend:** React (with Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT + bcryptjs
- **Other Tools:** CORS, cookie-parser

## 📁 Project Structure

```
ticket-booking-app/
├── api/           # Backend code (Express)
│   ├── models/    # Mongoose schemas: User, Place, Booking
│   └── index.js   # Main server file
├── client/        # Frontend code (React + Vite)
│   ├── public/
│   └── src/
└── README.md
```

## 📦 Project Setup

### ⚙️ Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd api
npm install
```

Create a `.env` file in the `api` folder with the following content:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

### ⚛️ Frontend Setup (Vite + React)

Navigate to the frontend directory and install dependencies:

```bash
cd client
npm install
npm run dev
```

### 📸 Screenshots

#### Home Page

![Home Page](./client/public/screenshots/homepage.png)

#### Booking Page

![Booking Page](./client/public/screenshots/booking-page.png)

#### Booking Information

![Booking Information](./client/public/screenshots/booking-information.png)

#### Booking Widget

![Booking Widget](./client/public/screenshots/booking-widget.png)

#### Place Form Page

![Place Form Page](./client/public/screenshots/place-form-page.png)

#### Places Page

![Places Page](./client/public/screenshots/places.png)

