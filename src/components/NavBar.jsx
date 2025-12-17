import { Link } from "react-router-dom"

function NavBar(){
  return (
    <header>
      <nav>
        <a href="#">CatsConnect</a>
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
            <Link to="/">Hangouts</Link>
          </li>
          <li>
            <Link to="/">Friends</Link>
          </li>
          <li>
            <Link to="/profile">Me</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;