import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';
import { createClient } from '@supabase/supabase-js'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        setMsg('');

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pass
        });

        if (error){
            setMsg(error.message);
        } else {
            setMsg("Logged in!")
            navigate('/profile/me')
        }
    }

    return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            required
          />
        </div>
        <Link to="/signup" class="login_signup">Don't have an account? Sign up</Link>
        <button type="submit">Log In</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default LoginPage;