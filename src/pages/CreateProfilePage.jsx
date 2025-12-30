import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";


function CreateProfilePage() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        major: "",
        date_of_birth: "",
        graduation_year: "",
        bio: ""
    });

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/login");
            } 
        };
        checkSession();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data: { session } } = await supabase.auth.getSession();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    id: session.user.id, 
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    major: formData.major,
                    date_of_birth: formData.date_of_birth,
                    graduation_year: formData.graduation_year,
                    email: session.user.email,
                    bio: formData.bio,
                }),
            });

            if (response.ok) {
                navigate("/profile/me");
            } else {
                const errorData = await response.json();
                alert("Error creating profile: " + errorData.error);
            }
        } catch (error) {
            console.error("Network/JSON Error:", error);
        }
    };

    return (
        <main>
            <h1>Complete Your Profile</h1>
            <p>Tell us a bit about yourself to get started.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="major">Major:</label>
                    <input
                        id="major"
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="date_of_birth">Birthday (YYYY-MM-DD):</label>
                    <input
                        id="date_of_birth"
                        type="text"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="graduation_year">Graduation Year:</label>
                    <input
                        id="graduation_year"
                        type="text"
                        name="graduation_year"
                        value={formData.graduation_year}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="bio">Quick bio about yourself:</label>
                    <input
                        id="bio"
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Create Profile</button>
            </form>
        </main>
    );
} 



export default CreateProfilePage;