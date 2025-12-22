import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { CURRENT_USER } from "../constants";

function ProfilePage() {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const ID = (!params.id || params.id === 'me')
            ? CURRENT_USER.id
            : params.id;

        const fetchUser = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${API_URL}/users/${ID}`);
                if (!response.ok) {
                    console.error("API failed:", response.status);
                    return;
                }

                const data = await response.json();
                setUser(data);

            } catch (e) {
                console.e("Network/JSON error:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();

    }, [params.id]);

    return (
        <main>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : user.length === 0 ? (
                <div>
                    <h1>No users found or failed to load. </h1>
                    <h1>Try refreshing</h1>
                </div>
            ) :
                <div>
                    <h1> {user.first_name} {user.last_name}</h1>
                    <h2 style={{textAlign: "center"}}>Email: {user.email}</h2>
                    <h2 style={{textAlign: "center"}}>Major: {user.major}</h2>
                    <h2 style={{textAlign: "center"}}>Class of {user.graduation_year}</h2>
                    <h2 style={{textAlign: "center"}}>"{user.bio}"</h2>
                </div>
            }
        </main>
    );
}

export default ProfilePage