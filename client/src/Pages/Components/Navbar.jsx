import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./styles/Navbar.css";

const Navbar = () => {
  const { token } = useContext(AuthContext);
  const isAuthenticated = !!token; // convert token to boolean

  return (
    <header className="header-navbar-container">
      <div className="header-container">
        <div>
          <h1 className="navbar-title text-xl font-semibold">OrganizeMe</h1>
        </div>
        <nav>
          <ul>
            {isAuthenticated && (
              <li>
                Contact
                <ul className="dropdown">
                  <li>
                    <Link to="/add-contact">Add</Link>
                  </li>
                  <li>
                    <Link to="/contacts">List</Link>
                  </li>
                  <li>
                    <Link to="/contact-filter">Filter</Link>
                  </li>
                </ul>
              </li>
            )}
            {/* Todo Menu: Only show if authenticated */}
            {isAuthenticated && (
              <li>
                Todo
                <ul className="dropdown">
                  <li>
                    <Link to="/add-todo">Add</Link>
                  </li>
                  <li>
                    <Link to="/todos">List</Link>
                  </li>
                </ul>
              </li>
            )}

            {/* User Menu */}
            <li>
              User
              <ul className="dropdown">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/update">Update</Link>
                    </li>
                    <li>
                      <Link to="/delete">Delete</Link>
                    </li>
                    <li>
                      <Link to="/logout">Logout</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
