import "./Navbar.css";

import { Link, NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../contexts/auth-context";

export const Navbar = () => {
  const { logout } = useAuthentication();
  const { user } = useAuthValue();

  return (
    <nav className="navbar">
      <Link exact to="/" className="navbar-title">
        Mini <span>Blog</span>
      </Link>
      <ul className="link-list">
        <li>
          <NavLink exact to="/" className="navbar-link">
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" className="navbar-link">
                Enter
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="navbar-link">
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create" className="navbar-link">
                New post
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="navbar-link">
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about" className="navbar-link">
            About
          </NavLink>
        </li>
        {user && (
          <li>
            <button className="logout-btn" onClick={logout}>
              Log out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
