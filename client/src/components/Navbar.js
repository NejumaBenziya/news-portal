import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/search/${search}`);
      setSearch("");
    }
  };

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
    <nav className="navbar navbar-dark bg-dark shadow-sm py-3">
      <div className="container-fluid px-4 d-flex align-items-center justify-content-between flex-nowrap">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 text-white me-4"
        >
          📰 News Portal
        </Link>

        {/* Categories */}
        <div className="d-flex align-items-center gap-3 flex-nowrap">

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

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3 ms-4">

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
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                  width: "180px",
                }}
              />

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

          {/* Admin */}
          <Link
            to="/admin/login"
            className="btn btn-outline-light rounded-pill px-4 fw-semibold"
          >
            Admin
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;