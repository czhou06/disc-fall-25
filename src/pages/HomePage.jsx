import { useState, useEffect } from "react";
import Card from "../components/Card";
import { supabase } from "../supabaseClient";
import useAuth from "../components/AuthContext"

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

function HomePage() {
    const [likedCards, setLikedCards] = useState({
        hangouts: [],
        people: []
    });

    const [users, setUsers] = useState([]);
    const [myProfile, setMyProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {isLoggedIn, user} = useAuth(); 
    const [errorMsg, setErrorMsg] = useState("No users found or failed to load. Try refreshing");
    const API_URL = import.meta.env.VITE_API_URL

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
        const fetchMyInfo = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!isLoggedIn) {
                setMyProfile(null);
                return;
            }
            
            try {
                const response = await fetch(`${API_URL}/users/${user.id}`, {
                    headers: {
                        'Authorization': session ? `Bearer ${session.access_token}` : ""
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMyProfile(data);
                }
            } catch (error) {
                console.error("Error fetching my profile:", error);
            }
        };

        fetchMyInfo();
    }, [API_URL, user, isLoggedIn]);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            
            const { data: { session } } = await supabase.auth.getSession();

            try {
                if (!isLoggedIn) {
                    setErrorMsg("You need to log in first to see profiles.");
                    return;
                }

                const response = await fetch(`${API_URL}/users/profiles`, {
                    headers: {
                        'Authorization': session ? `Bearer ${session.access_token}` : ""
                    }
                }); 

                if (!response.ok) {
                    console.error("API failed:", response.status);
                    setErrorMsg("Failed to load users. Try refreshing.");
                    return; 
                }
                
                const data = await response.json();
                setUsers(data);
            }
            catch (e) {
                console.error("Network/JSON error:", e);
                setErrorMsg("Network error. Please check your connection.");
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchUsers();
}, [API_URL]);  

    return (
        <main>
            <h1>
                {isLoggedIn && myProfile ? `Welcome Back, ${myProfile.first_name} ${myProfile.last_name}!` : "Welcome, Guest!"}
            </h1>
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
                        <h1>Loading users...</h1>
                    ) : users.length === 0 ? (
                        <p>{errorMsg}</p>
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