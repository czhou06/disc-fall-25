import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import useAuth from "./AuthContext";

function NavBar() {
  const { isLoggedIn } = useAuth();

return (
  <header>
    <nav>
      <Link className="nav_foot_link" to="/">CatsConnect</Link>
      <label htmlFor="search-bar" className="hidden">
        Who are we meeting today?
      </label>
      <input
        type="search"
        id="search-bar"
        placeholder="Who are we meeting today?"
      />
      <ul>
        <li>
          <Link className="nav_foot_link" to="/">Hangouts</Link>
        </li>
        <li>
          <Link className="nav_foot_link" to="/">Friends</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link className="nav_foot_link" to="/profile/me">Me</Link>
          </li>
        ) : (
          <li>
            <Link className="nav_foot_link" to="/login">Login</Link>
          </li>)}
      </ul>
    </nav>
  </header>
);
}

export default NavBar;