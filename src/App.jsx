import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TarotPage from './pages/TarotPage'
import FortunePage from './pages/FortunePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1 className="logo">🔮 Destiny</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Tarot</Link>
            <Link to="/fortune" className="nav-link">Birthday</Link>
          </div>
        </nav>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<TarotPage />} />
            <Route path="/fortune" element={<FortunePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

