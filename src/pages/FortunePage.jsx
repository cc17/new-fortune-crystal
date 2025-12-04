import { useState } from 'react'
import { getChineseZodiac, getConstellation, generateAnswer } from '../utils/zodiac'
import { products } from '../data/products'
import { constellations } from '../data/constellations'
import { cities } from '../data/cities'
import './FortunePage.css'

function FortunePage() {
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    city: '',
    topic: 'Love',
    email: ''
  })
  
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // 清除该字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.year || formData.year < 1900 || formData.year > 2024) {
      newErrors.year = 'Please enter a valid year (1900-2024)'
    }
    
    if (!formData.month || formData.month < 1 || formData.month > 12) {
      newErrors.month = 'Please enter a valid month (1-12)'
    }
    
    if (!formData.day || formData.day < 1 || formData.day > 31) {
      newErrors.day = 'Please enter a valid day (1-31)'
    }
    
    if (!formData.city) {
      newErrors.city = 'Please select a city'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const zodiac = getChineseZodiac(parseInt(formData.year))
    const constellation = getConstellation(parseInt(formData.month), parseInt(formData.day))
    const answer = generateAnswer(formData.topic, '', formData.year)

    setResult({
      zodiac,
      constellation,
      answer,
      topic: formData.topic
    })

    // 滚动到结果区域
    setTimeout(() => {
      document.querySelector('.result-container')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  const handleReset = () => {
    setFormData({
      year: '',
      month: '',
      day: '',
      city: '',
      topic: 'Love',
      email: ''
    })
    setResult(null)
    setErrors({})
  }

  return (
    <div className="fortune-page">
      <div className="hero-section">
        <div className="cosmic-bg"></div>
        <h2 className="page-title">Birthday Fortune</h2>
        <p className="page-subtitle">Discover your destiny through the stars</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Birth Date</label>
            <div className="date-inputs">
              <div className="input-wrapper">
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year"
                  className={errors.year ? 'error' : ''}
                  min="1900"
                  max="2024"
                />
                <span className="input-suffix">Y</span>
              </div>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  placeholder="Month"
                  className={errors.month ? 'error' : ''}
                  min="1"
                  max="12"
                />
                <span className="input-suffix">M</span>
              </div>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  placeholder="Day"
                  className={errors.day ? 'error' : ''}
                  min="1"
                  max="31"
                />
                <span className="input-suffix">D</span>
              </div>
            </div>
            {(errors.year || errors.month || errors.day) && (
              <span className="error-message">
                {errors.year || errors.month || errors.day}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Birth City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`city-select ${errors.city ? 'error' : ''}`}
            >
              {cities.map(city => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            {errors.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Topic</label>
            <div className="topic-buttons">
              {['Love', 'Career', 'Wealth', 'Study'].map(topic => (
                <button
                  key={topic}
                  type="button"
                  className={`topic-button ${formData.topic === topic ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, topic }))}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`full-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Start Reading
          </button>
        </form>
      </div>

      {result && (
        <div className="result-container">
          <div className="result-badge">✨ YOUR DESTINY ✨</div>
          <h3 className="result-header">Fortune Reading Result</h3>
          
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">🐉</div>
              <div className="info-label">Zodiac</div>
              <div className="info-value">{result.zodiac}</div>
            </div>
          </div>

          <div className="constellation-section">
            <h4 className="constellation-header">YOUR CONSTELLATION</h4>
            <div className="constellations-grid">
              {constellations.map((constellation) => (
                <div 
                  key={constellation.name}
                  className={`constellation-card ${
                    constellation.name === result.constellation ? 'active' : ''
                  }`}
                >
                  <div className="constellation-symbol">{constellation.symbol}</div>
                  <div className="constellation-icon">{constellation.icon}</div>
                  <div className="constellation-name">{constellation.name}</div>
                  <div className="constellation-en-name">{constellation.enName}</div>
                  <div className="constellation-date">{constellation.dateRange}</div>
                  {constellation.name === result.constellation && (
                    <div className="active-badge">YOUR SIGN</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="answer-card">
            <h4 className="answer-title">About【{result.topic}】</h4>
            <p className="answer-text">{result.answer}</p>
          </div>

          <div className="products-section">
            <h4 className="products-title">RECOMMENDED FOR YOU</h4>
            <p className="products-subtitle">Crystal Energy Accessories</p>
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card-horizontal">
                  {/* Left: Product Image */}
                  <div className="product-left">
                    <div className="product-image-container">
                      <img src={product.image} alt={product.name} className="product-image" />
                    </div>
                    <div className="product-label">{product.name}</div>
                  </div>
                  
                  {/* Right: Ratings */}
                  <div className="product-right">
                    <div className="product-score-badge">
                      <div className="score-number">{product.score}%</div>
                      <div className="score-label">Recommended</div>
                    </div>
                    <div className="product-ratings">
                      <div className="rating-item">
                        <span className="rating-label">Career</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.ratings.career ? 'star filled' : 'star'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Wealth</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.ratings.financial ? 'star filled' : 'star'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Love</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.ratings.relationship ? 'star filled' : 'star'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Health</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.ratings.health ? 'star filled' : 'star'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="reset-button" onClick={handleReset}>
            New Reading
          </button>
        </div>
      )}
    </div>
  )
}

export default FortunePage

