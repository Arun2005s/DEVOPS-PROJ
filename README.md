# HotelEase – Smart Hotel Booking System

## 🚀 How to Run the Project

The easiest and most reliable way to run HotelEase is using **Docker Compose**. This ensures all services (Frontend, Backend, and Database) are perfectly orchestrated.

### 1. Prerequisite: Environment Variables
Ensure you have a `.env` file in the root directory and in the `backend/` directory with the following keys:
- `MONGODB_URI` (Your MongoDB Atlas or local URI)
- `JWT_SECRET` (Any secure string)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### 2. Method A: Using Docker (Recommended)
This command builds the images and starts all containers in the background.

```bash
docker-compose up --build -d
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### 3. Method B: Manual Execution (Local Development)

#### Backend
```bash
cd backend
npm install
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Tech Stack
- **Frontend**: React 19 (Vite), Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas or Containerized)
- **Security**: JWT Authentication, Bcrypt Password Hashing
- **Graphics**: Glassmorphism Design System

## 📁 Project Structure
- `/frontend`: React application with premium UI.
- `/backend`: Express API with MVC architecture.
- `docker-compose.yml`: Multi-container orchestration.