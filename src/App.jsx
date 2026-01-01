import './App.css'
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import CreateProfilePage from "./pages/CreateProfilePage"
import { Routes, Route } from 'react-router-dom'
import { CURRENT_USER } from "./constants";
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const ID = CURRENT_USER.id

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />

          <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="profile/me" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="create_profile" element={<ProtectedRoute><CreateProfilePage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App;
