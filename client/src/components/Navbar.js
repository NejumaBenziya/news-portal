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
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">

  <div className="container-fluid px-4">

    {/* Logo */}
    <Link
      to="/"
      className="navbar-brand fw-bold fs-3"
    >
      📰 News Portal
    </Link>

    {/* Mobile Toggle Button */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Navbar Content */}
    <div
      className="collapse navbar-collapse"
      id="navbarContent"
    >

      {/* Left Side Links */}
      <div className="navbar-nav me-auto gap-lg-3">

        <Link
          className={`nav-link fw-semibold ${
            location.pathname === "/"
              ? "text-warning"
              : ""
          }`}
          to="/"
        >
          Home
        </Link>

        {categories.map((category) => (

          <Link
            key={category}
            to={`/category/${category}`}
            className={`nav-link fw-semibold ${
              location.pathname ===
              `/category/${category}`
                ? "text-warning"
                : ""
            }`}
          >
            {category}
          </Link>

        ))}

      </div>

      {/* Right Side */}
      <div className="d-flex align-items-center gap-3 flex-column flex-lg-row mt-3 mt-lg-0">

        {/* Search */}
        <form
          className="d-flex"
          onSubmit={handleSearch}
        >

          <div className="input-group">

            <input
              type="search"
              className="form-control border-0 shadow-none"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <button
              className="btn btn-warning"
              type="submit"
            >
              🔍
            </button>

          </div>
        </form>

        {/* Admin */}
        {token ? (

          <div className="dropdown">

            <button
              className="btn btn-outline-light dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Admin
            </button>

            <ul className="dropdown-menu dropdown-menu-end">

              <li>
                <Link
                  className="dropdown-item"
                  to="/admin"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  className="dropdown-item"
                  to="/profile"
                >
                  My Profile
                </Link>
              </li>

              <li>
                <Link
                  className="dropdown-item"
                  to="/change-password"
                >
                  Change Password
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => {

                    localStorage.removeItem("token");
                    localStorage.removeItem("admin");

                    navigate("/");
                  }}
                >
                  Sign Out
                </button>
              </li>

            </ul>

          </div>

        ) : (

          <Link
            to="/admin/login"
            className="btn btn-outline-light"
          >
            Admin
          </Link>

        )}

      </div>

    </div>

  </div>

</nav>
  );
}

export default Navbar;