import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loggedIn() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      }
    }
    
    loggedIn();    

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
  });

  return () => subscription.unsubscribe();

}, []);



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