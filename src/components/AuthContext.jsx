import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from "../supabaseClient"

const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loggedIn() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUser(session.user)
      }
      setLoading(false);
    }
    
    loggedIn();    

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLoggedIn(true);
        setUser(session.user)
      } else {
        setIsLoggedIn(false);
        setUser(null)
      }
      setLoading(false);
  });

  return () => subscription.unsubscribe();

}, []);

  return (
    <authContext.Provider value={{ user, isLoggedIn, loading }}>
      {children}
    </authContext.Provider>
  );
};
function useAuth() {return useContext(authContext)} ;

export default useAuth;