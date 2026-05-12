# 📰 News Portal

A full-stack MERN News Portal application with a modern public news interface and an admin dashboard for managing news posts.

---

# 🚀 Features

## 🌐 Public Interface

* Hero section for latest news
* Category-based news pages
* Search functionality
* Single news page
* Responsive UI
* Latest published news first
* Relative time display (e.g. 2 hours ago)
* News cards with hover effects
* Loading spinners

---

## 🔐 Admin Panel

### Authentication

* Admin login with JWT authentication
* Protected admin routes
* Change password feature
* Admin profile page
* Sign out functionality

### News Management

* Create news posts
* Edit news posts
* Delete news posts
* News filtering using tabs
* Status management:

  * Draft
  * In Review
  * Published
  * Scheduled

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap 5
* date-fns

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* CORS

---

# 📂 Project Structure

## Frontend

```bash
client/
 ├── public/
 ├── src/
 │   ├── api/
 │   ├── components/
 │   ├── pages/
 │   ├── App.js
 │   ├── index.js
 │   └── index.css
```

## Backend

```bash
server/
 ├── src/
 │   ├── controllers/
 │   ├── middleware/
 │   ├── models/
 │   ├── routes/
 │   └── server.js
 ├── .env
 └── createAdmin.js
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
DB_CONNECTION_LINK=your_mongodb_connection
JWT_SECRET=your_secret_key
```

## Frontend `.env.development`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Frontend `.env.production`

```env
REACT_APP_API_URL=https://your-backend-url/api
```

---

# ▶️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/news-portal.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

---

# ▶️ Run Project

## Start Backend

```bash
npm start
```

## Start Frontend

```bash
npm start
```

---

# 🔑 Admin Setup

Run the admin creation script:

```bash
node createAdmin.js
```

---

# 📌 Backend API Routes

## 🔐 Auth Routes

| Method | Route                       | Protected | Description     |
| ------ | --------------------------- | --------- | --------------- |
| POST   | `/api/auth/login`           | ❌         | Admin login     |
| PUT    | `/api/auth/change-password` | ✅         | Change password |

---

## 📰 News Routes

| Method | Route                     | Protected | Description            |
| ------ | ------------------------- | --------- | ---------------------- |
| GET    | `/api/news`               | ❌         | Get published news     |
| GET    | `/api/news/:id`           | ❌         | Get single news        |
| GET    | `/api/news/search/:query` | ❌         | Search news            |
| GET    | `/api/news?admin=true`    | ✅         | Get all news for admin |
| POST   | `/api/news`               | ✅         | Create news            |
| PUT    | `/api/news/:id`           | ✅         | Update news            |
| DELETE | `/api/news/:id`           | ✅         | Delete news            |

---

# 🌐 Frontend Routes

| Route              | Description          |
| ------------------ | -------------------- |
| `/`                | Home page            |
| `/category/:name`  | Category news page   |
| `/news/:id`        | Single news page     |
| `/search/:query`   | Search results page  |
| `/admin/login`     | Admin login          |
| `/admin`           | Admin dashboard      |
| `/profile`         | Admin profile        |
| `/change-password` | Change password page |

---

# 📸 Features Included

* Responsive Navbar
* Search Bar
* Hero News Section
* Loading Spinners
* Hover Effects
* Admin Dropdown
* Profile Page
* Change Password Page
* Protected Routes
* MongoDB Integration
* JWT Authentication

---

# 🌍 Deployment

## Frontend

* Vercel

## Backend

* Render

---

# 👩‍💻 Author

**Nejuma Benziya**

MERN Stack Developer
