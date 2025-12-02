import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { tarotCards } from '../data/tarotCards'
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
      { name: '爱情', value: selectedCard.love },
      { name: '财富', value: selectedCard.wealth },
      { name: '事业', value: selectedCard.career },
      { name: '学业', value: selectedCard.study },
    ]
  }

  return (
    <div className="tarot-page">
      <h2 className="page-title">塔罗牌占卜</h2>
      <p className="page-subtitle">静心冥想，抽取一张属于你的塔罗牌</p>

      <div className="card-section">
        <div 
          className={`tarot-card ${isFlipping ? 'flipping' : ''} ${selectedCard ? 'revealed' : ''}`}
          onClick={drawCard}
        >
          {!selectedCard ? (
            <div className="card-back">
              <div className="card-pattern">🌙</div>
              <p>点击抽牌</p>
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
            {isFlipping ? '抽取中...' : '抽取塔罗牌'}
          </button>
        )}
      </div>

      {selectedCard && (
        <div className="result-section">
          <div className="result-badge">✨ 占卜结果 ✨</div>
          <h3 className="result-title">【 {selectedCard.name} 】运势解析</h3>
          <p className="result-description">{selectedCard.description}</p>
          
          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-icon">💗</span>
              <span className="stat-label">爱情</span>
              <span className="stat-value">{selectedCard.love}分</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💰</span>
              <span className="stat-label">财富</span>
              <span className="stat-value">{selectedCard.wealth}分</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💼</span>
              <span className="stat-label">事业</span>
              <span className="stat-value">{selectedCard.career}分</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <span className="stat-label">学业</span>
              <span className="stat-value">{selectedCard.study}分</span>
            </div>
          </div>

          <div className="chart-container">
            <h4 className="chart-title">运势详细分析</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#667eea" name="运势指数" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <button className="redraw-button" onClick={drawCard}>
            🔄 重新抽取
          </button>
        </div>
      )}
    </div>
  )
}

export default TarotPage

