import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Category from "./pages/Category";
import SingleNews from "./pages/SingleNews";
import SearchPage from "./pages/SearchPage";

// Admin Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";

// Shared Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (

    // React Router Wrapper
    <BrowserRouter>

      {/* Main App Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >

        {/* Top Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <div style={{ flex: 1 }}>

          {/* Application Routes */}
          <Routes>

            {/* Home Page */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Category News Page */}
            <Route
              path="/category/:name"
              element={<Category />}
            />

            {/* Single News Page */}
            <Route
              path="/news/:id"
              element={<SingleNews />}
            />

            {/* Search Results Page */}
            <Route
              path="/search/:query"
              element={<SearchPage />}
            />

            {/* Admin Login Page */}
            <Route
              path="/admin/login"
              element={<Login />}
            />

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            {/* Admin Profile Page */}
            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* Change Password Page */}
            <Route
              path="/change-password"
              element={<ChangePassword />}
            />

          </Routes>
        </div>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;