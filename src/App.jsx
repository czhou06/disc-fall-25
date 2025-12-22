import './App.css'
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import { Routes, Route } from 'react-router-dom'
import { CURRENT_USER } from "./constants";

const ID = CURRENT_USER.id

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path = "profile" element={<ProfilePage />} />
        <Route path = "profile/me" element={<ProfilePage />} />
        <Route path = "profile/:id" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App;
