import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { tarotCards } from '../data/tarotCards'
import { products } from '../data/products'
import './TarotPage.css'

function TarotPage() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [isFlipping, setIsFlipping] = useState(false)

  const drawCard = () => {
    if (isFlipping) return
    
    setIsFlipping(true)
    setSelectedCard(null)
    
    setTimeout(() => {
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
      setSelectedCard(randomCard)
      setIsFlipping(false)
      
      // 滚动到结果区域
      setTimeout(() => {
        document.querySelector('.result-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        })
      }, 600)
    }, 500)
  }

  const getChartData = () => {
    if (!selectedCard) return []
    return [
      { name: 'Love', value: selectedCard.love },
      { name: 'Wealth', value: selectedCard.wealth },
      { name: 'Career', value: selectedCard.career },
      { name: 'Study', value: selectedCard.study },
    ]
  }

  return (
    <div className="tarot-page">
      <h2 className="page-title">Tarot Reading</h2>
      <p className="page-subtitle">Meditate and draw your destiny card</p>

      <div className="card-section">
        <div 
          className={`tarot-card ${isFlipping ? 'flipping' : ''} ${selectedCard ? 'revealed' : ''}`}
          onClick={drawCard}
        >
          {!selectedCard ? (
            <div className="card-back">
              <div className="card-pattern">🌙</div>
              <p>Click to Draw</p>
            </div>
          ) : (
            <div className="card-front">
              <h3 className="card-name">{selectedCard.name}</h3>
              <div className="card-icon">🎴</div>
              <p className="card-description">{selectedCard.description}</p>
            </div>
          )}
        </div>

        {!selectedCard && (
          <button className="draw-button" onClick={drawCard} disabled={isFlipping}>
            {isFlipping ? 'Drawing...' : 'Draw Tarot Card'}
          </button>
        )}
      </div>

      {selectedCard && (
        <div className="result-section">
          <div className="result-badge">✨ READING RESULT ✨</div>
          <h3 className="result-title">【 {selectedCard.name} 】Fortune Analysis</h3>
          <p className="result-description">{selectedCard.description}</p>
          
          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-icon">💗</span>
              <span className="stat-label">Love</span>
              <span className="stat-value">{selectedCard.love}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💰</span>
              <span className="stat-label">Wealth</span>
              <span className="stat-value">{selectedCard.wealth}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💼</span>
              <span className="stat-label">Career</span>
              <span className="stat-value">{selectedCard.career}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <span className="stat-label">Study</span>
              <span className="stat-value">{selectedCard.study}</span>
            </div>
          </div>

          <div className="chart-container">
            <h4 className="chart-title">Detailed Fortune Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#667eea" name="Fortune Index" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="products-section">
            <h4 className="products-title">RECOMMENDED FOR YOU</h4>
            <p className="products-subtitle">Crystal Energy Accessories</p>
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card-vertical">
                  {/* 商品图片 */}
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>
                  
                  {/* 商品信息 */}
                  <div className="product-info">
                    <h5 className="product-name">{product.name}</h5>
                    
                    <div className="product-score-badge">
                      <span className="score-number">{product.score}%</span>
                      <span className="score-label">Recommended</span>
                    </div>
                    
                    <div className="product-ratings">
                      <div className="rating-row">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.ratings.career ? 'star filled' : 'star'}>★</span>
                          ))}
                        </div>
                      </div>
                      <div className="rating-row">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.ratings.financial ? 'star filled' : 'star'}>★</span>
                          ))}
                        </div>
                      </div>
                      <div className="rating-row">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.ratings.relationship ? 'star filled' : 'star'}>★</span>
                          ))}
                        </div>
                      </div>
                      <div className="rating-row">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.ratings.health ? 'star filled' : 'star'}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="redraw-button" onClick={drawCard}>
            🔄 Draw Again
          </button>
        </div>
      )}
    </div>
  )
}

export default TarotPage

