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
            <a href="#">Hangouts</a>
          </li>
          <li>
            <a href="#">Friends</a>
          </li>
          <li>
            <a href="#">Me</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;