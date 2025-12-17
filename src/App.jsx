import './App.css'
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path = "profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App;
