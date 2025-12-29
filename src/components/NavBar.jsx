import { Link } from "react-router-dom"

function NavBar(){
  return (
    <header>
      <nav>
        <Link class="nav_foot_link" to="/">CatsConnect</Link>
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
            <Link class="nav_foot_link" to="/">Hangouts</Link>
          </li>
          <li>
            <Link class="nav_foot_link" to="/">Friends</Link>
          </li>
          <li>
            <Link class="nav_foot_link" to="/profile/me">Me</Link>
          </li>
          <li>
            <Link class="nav_foot_link" to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;