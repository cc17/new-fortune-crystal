import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TarotPage from './pages/TarotPage'
import FortunePage from './pages/FortunePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1 className="logo">🔮 水晶球占卜</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">塔罗占卜</Link>
            <Link to="/fortune" className="nav-link">生日占卜</Link>
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

