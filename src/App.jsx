import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const initialHangouts = [
  { id: 10, name: "Study Session", location: "Main Library", dateTime: "10/15 3pm", organizer: "Alice" },
  { id: 20, name: "DISC Rock Painting", location: "The Rock", dateTime: "10/15 10pm", organizer: "Bob" },
  { id: 30, name: "NU vs some team", location: "Ryan Field", dateTime: "10/15 12pm", organizer: "Willie" },
  
];

const initialPeople = [
  { id: 11, name: "John", dorm: "Plex", major: "CS", quote: "go cats" },
  { id: 21, name: "Jane", dorm: "Schapiro", major: "Econ", quote: "uh" },
  { id: 31, name: "Willie", dorm: "Shepard", major: "Psych", quote: "idk"}
];

const Username = "Chris"



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

// A component to display either a hangout or a person profile
function Card({ type, info, isLiked, onLikeToggle }) {
  // Determine content based on the type prop
  let details;
  if (type === 'hangout') {
    details = (
      <>
        <h3>{info.name}</h3>
        <h3>{info.location}</h3>
        <h3>{info.dateTime}</h3>
        <h3>{info.organizer}</h3>
      </>
    );
  } else if (type === 'person') {
    details = (
      <>
        <h3>{info.name}</h3>
        <h3>{info.dorm}</h3>
        <h3>{info.major}</h3>
        <h3>{info.quote}</h3>
      </>
    );
  }

  const likeStatus = `card ${isLiked ? 'card-liked' : ''}`;
  const buttonText = isLiked ? 'Unlike' : 'Like';
  
  return (
    <article className={likeStatus}>
      {details}
      <button onClick={() => onLikeToggle(info.id, type)}>
        {buttonText}
      </button>
    </article>
  );
}


function App() {
  const [likedCards, setLikedCards] = useState({
  hangouts: [], 
  people: []    
});

  const toggleLiked = (id, type) => {
    setLikedCards(stt => {
      
      
      const key = type === 'hangout' ? 'hangouts' : 'people';

      if (stt[key].includes(id)) { 
        return { 
          ...stt, 
          [key]: stt[key].filter(card_id => card_id !== id) 
        };
      } else {
        return { 
          ...stt, 
          [key]: [...stt[key], id] 
        };
      }
    });
  };

  useEffect(() => {
    console.log('Liked items updated:', likedCards);
  }, [likedCards]);

  return (
  <>
    <NavBar userName = {Username}/> 
    <main>
      <h1>Welcome Back, {Username}!</h1>
      
      <section>
        <h2>Hangouts for You</h2>
        <div className="cards">
          {initialHangouts.map(hangout => (
            <Card
              key={hangout.id}
              type="hangout"
              info={hangout}
              isLiked={likedCards.hangouts.includes(hangout.id)}
              onLikeToggle={toggleLiked}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>People for You</h2>
        <div className="cards">
          {initialPeople.map(person => (
            <Card
              key={person.id}
              type="person"
              info={person}
              isLiked={likedCards.people.includes(person.id)}
              onLikeToggle={toggleLiked}
            />
          ))}
        </div>
      </section>
    </main>
    
    <footer>
      <div className="footer-logo">
        <div className="logo-circle">CC</div>
      </div>
      <nav className="footer-nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Our Team</a></li>
        </ul>
      </nav>
      <nav className="footer-socials">
        <a className="link" href="#">X</a>
        <a className="link" href="#">Instagram</a>
        <a className="link" href="#">Facebook</a>
      </nav>
    </footer>
  </>
);
}

export default App
