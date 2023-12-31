import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the user is logged in (you can use your own logic here)
  const isAuthenticated = !!localStorage.getItem("authToken");

  // Get the first letter of the username to display as the avatar
  const username = localStorage.getItem("userName");
  const avatarLetter = username ? username[0].toUpperCase() : "";

  // Function to handle logout
  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");

      navigate(`/login`);
  };

  // List of paths where the Navbar should not be displayed
  const authPaths = [
    "/",
    "/login",
    "/register",
    "/forgotPassword",
    "/verifyRandomString",
    "/resetPassword",
  ];

  // Check if the current path is in the authPaths
  const shouldHideNavbar = authPaths.includes(location.pathname);

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="/notes.png" alt="Logo" width="50" height="50" />
          <span className="ms-2">Notes App</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="d-flex align-items-center">
                      <Link to="/addNotes" className="nav-link">
                        <img src="/add.png" alt="Logo" width="25" height="25" />
                        <span className="ms-2">Add Notes</span>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="d-flex align-items-center">
                      <Link to="/about" className="nav-link">
                        <img
                          src="/info.png"
                          alt="Logo"
                          width="25"
                          height="25"
                        />
                        <span className="ms-2">About</span>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="d-flex align-items-center">
                      <div className="avatar-badge">
                        <span className="avatar-letter">{avatarLetter}</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="link"
                        className="logout-icon"
                        onClick={handleLogout}
                      >
                        <img
                          src="/logout.png"
                          alt="Logo"
                          width="25"
                          height="25"
                        />
                        <span className="ms-2">Logout</span>
                      </Button>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              // If the user is not logged in, show the login link
              <li
                className={`nav-item ${
                  location.pathname === "/login" ? "active" : ""
                }`}
              >
                <Link to="/login" className="nav-link">
                  <img src="/login.png" alt="Logo" width="25" height="25" />
                  <span className="ms-2">Login</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
