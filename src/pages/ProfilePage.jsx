import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import useAuth from "../components/AuthContext";

function ProfilePage() {
    const params = useParams();
    const navigate = useNavigate();
    const { user: userAuth } = useAuth();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isOwnProfile = params.id === 'me'
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            let id = params.id;
            const { data: { session } } = await supabase.auth.getSession();

            if (!id || id === 'me') {
                if (!userAuth) {
                    console.error("No current log-in session");
                    setIsLoading(false);
                    return;
                }
                id = userAuth.id;
            }

            try {
                const response = await fetch(`${API_URL}/users/${id}`, {
                    headers: {
                        'Authorization': session ? `Bearer ${session.access_token}` : ""
                    }
                });
                if (!response.ok) {
                    console.error("API failed:", response.status);
                    setUser(null)
                    return;
                }

                const data = await response.json();
                setUser(data);

            } catch (e) {
                console.error("Network/JSON error:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();

    }, [params.id]);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        } else {
            navigate("/");
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you SURE? This cannot be undone.");
        if (!confirmDelete) return;

        const { data: { session } } = await supabase.auth.getSession()

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            if (response.ok) {
                await supabase.auth.signOut();
                navigate("/");
            } else {
                const responseError = await response.json();
                alert("Couldn't delete account: " + responseError)
            }
        } catch (error) {
            console.error("Network/JSON Error:", error);
        }
    }

    return (
        <main>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : !user ? (
                <div>
                    <h1>No users found or failed to load. </h1>
                    <h1>Try refreshing</h1>
                </div>
            ) :
                <div>
                    <h1> {user.first_name} {user.last_name}</h1>
                    <h2 style={{ textAlign: "center" }}>Email: {user.user_profiles?.email}</h2>
                    <h2 style={{ textAlign: "center" }}>Major: {user.user_profiles?.major}</h2>
                    <h2 style={{ textAlign: "center" }}>Class of {user.user_profiles?.graduation_year}</h2>
                    <h2 style={{ textAlign: "center" }}>"{user.user_profiles?.bio}"</h2>

                    {isOwnProfile && (
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <button onClick={handleSignOut}>
                                Sign Out
                            </button>
                            <button onClick={handleDeleteAccount} style={{ backgroundColor: '#ff4d4d', color: 'black' }}>
                                Delete Account
                            </button>
                        </div>
                    )}
                </div>


            }
        </main>
    );
}

export default ProfilePage