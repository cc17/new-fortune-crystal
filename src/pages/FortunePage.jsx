import { useState } from 'react'
import { getChineseZodiac, getConstellation, generateAnswer } from '../utils/zodiac'
import { products } from '../data/products'
import './FortunePage.css'

function FortunePage() {
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    topic: '爱情',
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
      newErrors.year = '请输入有效的年份（1900-2024）'
    }
    
    if (!formData.month || formData.month < 1 || formData.month > 12) {
      newErrors.month = '请输入有效的月份（1-12）'
    }
    
    if (!formData.day || formData.day < 1 || formData.day > 31) {
      newErrors.day = '请输入有效的日期（1-31）'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
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
      topic: '爱情',
      email: ''
    })
    setResult(null)
    setErrors({})
  }

  return (
    <div className="fortune-page">
      <h2 className="page-title">生日占卜</h2>
      <p className="page-subtitle">输入您的生日，探索命运的奥秘</p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">出生日期</label>
            <div className="date-inputs">
              <div className="input-wrapper">
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="年"
                  className={errors.year ? 'error' : ''}
                  min="1900"
                  max="2024"
                />
                <span className="input-suffix">年</span>
              </div>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  placeholder="月"
                  className={errors.month ? 'error' : ''}
                  min="1"
                  max="12"
                />
                <span className="input-suffix">月</span>
              </div>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  placeholder="日"
                  className={errors.day ? 'error' : ''}
                  min="1"
                  max="31"
                />
                <span className="input-suffix">日</span>
              </div>
            </div>
            {(errors.year || errors.month || errors.day) && (
              <span className="error-message">
                {errors.year || errors.month || errors.day}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">想问的问题</label>
            <div className="topic-buttons">
              {['爱情', '事业', '财富', '学业'].map(topic => (
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
            <label className="form-label">邮箱地址</label>
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
            开始占卜
          </button>
        </form>
      </div>

      {result && (
        <div className="result-container">
          <h3 className="result-header">占卜结果</h3>
          
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">🐉</div>
              <div className="info-label">生肖</div>
              <div className="info-value">{result.zodiac}</div>
            </div>
            <div className="info-card">
              <div className="info-icon">⭐</div>
              <div className="info-label">星座</div>
              <div className="info-value">{result.constellation}</div>
            </div>
          </div>

          <div className="answer-card">
            <h4 className="answer-title">关于【{result.topic}】的解答</h4>
            <p className="answer-text">{result.answer}</p>
          </div>

          <div className="products-section">
            <h4 className="products-title">为你推荐</h4>
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">{product.image}</div>
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button className="product-button">查看</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="reset-button" onClick={handleReset}>
            重新占卜
          </button>
        </div>
      )}
    </div>
  )
}

export default FortunePage

