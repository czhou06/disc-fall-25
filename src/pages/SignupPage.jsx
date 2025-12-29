import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg('');

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pass,
    });

    if (error) {
      setMsg(error.message);
    } else {
      setMsg('Success!');
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <Link class="login_signup" to="/login">Already have an account? Log In</Link>
        <button type="submit">Sign Up</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default SignUpPage;