import { useState, useEffect } from "react";
import Card from "../components/Card";

const initialHangouts = [
    { id: 10, name: "Study Session", location: "Main Library", dateTime: "10/15 3pm", organizer: "Alice" },
    { id: 20, name: "DISC Rock Painting", location: "The Rock", dateTime: "10/15 10pm", organizer: "Bob" },
    { id: 30, name: "NU vs some team", location: "Ryan Field", dateTime: "10/15 12pm", organizer: "Willie" },

];

const initialPeople = [
    { id: 11, name: "John", dorm: "Plex", major: "CS", quote: "go cats" },
    { id: 21, name: "Jane", dorm: "Schapiro", major: "Econ", quote: "uh" },
    { id: 31, name: "Willie", dorm: "Shepard", major: "Psych", quote: "idk" }
];

const Username = "Chris"



function HomePage() {
    const [likedCards, setLikedCards] = useState({
        hangouts: [],
        people: []
    });

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        const fetchUsers = async() => {
            setIsLoading(true);

            try {
                const response = await fetch('https://disc-assignment-5-users-api-iyct.onrender.com/api/users');
                if (!response.ok) {
                    console.error("API failed:", response.status);
                    return; 
                }
                
                const data = await response.json();
                setUsers(data)
            }
            catch (e) {
                console.error("Network/JSON error:", e);
            }
            finally {
                setIsLoading(false);
            }
            
        }

        fetchUsers();
    }, [])

    useEffect(() => {
        console.log("user data: ", users);
    }, [users])

    

    return (
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
                    {isLoading ? (
                        <p>Loading users...</p>
                    ) : users.lengths === 0 ? (
                        <p>No users found or failed to load. Try refreshing</p>
                    ) :
                        users.map(person => (
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
    )
}

export default HomePage;