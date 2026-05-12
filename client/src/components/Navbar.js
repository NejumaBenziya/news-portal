import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  // State for search input
  const [search, setSearch] = useState("");

  // React Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Get admin token from localStorage
  const token = localStorage.getItem("token");

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();

    // Navigate only if search input is not empty
    if (search.trim()) {
      navigate(`/search/${search}`);

      // Clear search field after navigation
      setSearch("");
    }
  };

  // Category list
  const categories = [
    "General",
    "Tech",
    "Business",
    "Sports",
    "Entertainment",
    "Politics",
    "Health",
  ];

  return (

    // Main navbar container
    <nav className="navbar navbar-dark bg-dark shadow-sm py-3">

      <div className="container-fluid px-4 d-flex align-items-center justify-content-between flex-nowrap">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 text-white me-4"
        >
          📰 News Portal
        </Link>

        {/* Category Links */}
        <div className="d-flex align-items-center gap-3 flex-nowrap">

          {/* Home Link */}
          <Link
            className={`text-decoration-none fw-semibold ${
              location.pathname === "/"
                ? "text-warning"
                : "text-light"
            }`}
            to="/"
          >
            Home
          </Link>

          {/* Dynamic Category Links */}
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className={`text-decoration-none fw-semibold ${
                location.pathname === `/category/${category}`
                  ? "text-warning"
                  : "text-light"
              }`}
            >
              {category}
            </Link>
          ))}

        </div>

        {/* Right Side Section */}
        <div className="d-flex align-items-center gap-3 ms-4">

          {/* Search Form */}
          <form
            className="d-flex"
            onSubmit={handleSearch}
          >
            <div className="input-group">

              {/* Search Input */}
              <input
                type="search"
                className="form-control border-0 shadow-none"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                  width: "180px",
                }}
              />

              {/* Search Button */}
              <button
                className="btn btn-warning"
                type="submit"
                style={{
                  borderTopRightRadius: "30px",
                  borderBottomRightRadius: "30px",
                }}
              >
                🔍
              </button>

            </div>
          </form>

          {/* Admin Section */}
          {token ? (

            // Admin Dropdown
            <div className="dropdown">

              {/* Dropdown Toggle Button */}
              <button
                className="btn btn-outline-light rounded-pill dropdown-toggle px-4 fw-semibold"
                data-bs-toggle="dropdown"
              >
                Admin
              </button>

              {/* Dropdown Menu */}
              <ul className="dropdown-menu dropdown-menu-end shadow border-0">

                {/* Dashboard Link */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin"
                  >
                    📊 Dashboard
                  </Link>
                </li>

                {/* Profile Link */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/profile"
                  >
                    👤 My Profile
                  </Link>
                </li>

                {/* Change Password Link */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/change-password"
                  >
                    🔒 Change Password
                  </Link>
                </li>

                {/* Divider */}
                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* Logout Button */}
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => {

                      // Remove token and admin info
                      localStorage.removeItem("token");
                      localStorage.removeItem("admin");

                      // Redirect to homepage
                      navigate("/");
                    }}
                  >
                    🚪 Sign Out
                  </button>
                </li>

              </ul>
            </div>

          ) : (

            // Admin Login Button
            <Link
              to="/admin/login"
              className="btn btn-outline-light rounded-pill px-4 fw-semibold"
            >
              Admin
            </Link>

          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;