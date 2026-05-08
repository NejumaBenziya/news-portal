import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      
      {/* Logo */}
      <Link className="navbar-brand fw-bold" to="/">
        📰 News Portal
      </Link>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        
        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/category/General">General</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/category/Tech">Tech</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/category/Business">Business</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/category/Sports">Sports</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/category/Entertainment">Entertainment</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/category/Politics">Politics</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/category/Health">Health</Link>
          </li>

        </ul>

        {/* Right side */}
        <Link className="btn btn-outline-light btn-sm" to="/admin/login">
          Admin Login
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;