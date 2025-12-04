// Calculate Chinese Zodiac
export function getChineseZodiac(year) {
  const zodiacs = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  return zodiacs[(year - 4) % 12];
}

// Calculate Constellation
export function getConstellation(month, day) {
  const constellations = [
    { name: 'Capricorn', endDay: 19 },
    { name: 'Aquarius', endDay: 18 },
    { name: 'Pisces', endDay: 20 },
    { name: 'Aries', endDay: 19 },
    { name: 'Taurus', endDay: 20 },
    { name: 'Gemini', endDay: 21 },
    { name: 'Cancer', endDay: 22 },
    { name: 'Leo', endDay: 22 },
    { name: 'Virgo', endDay: 22 },
    { name: 'Libra', endDay: 22 },
    { name: 'Scorpio', endDay: 21 },
    { name: 'Sagittarius', endDay: 21 },
    { name: 'Capricorn', endDay: 31 }
  ];

  const monthIndex = month - 1;
  if (day <= constellations[monthIndex].endDay) {
    return constellations[monthIndex].name;
  } else {
    return constellations[monthIndex + 1].name;
  }
}

// Mock Answer Generator
export function generateAnswer(topic, name, birthday) {
  const answers = {
    'Love': [
      'Your love fortune is flourishing. Singles may meet someone special. Those in relationships will find more stability through communication.',
      'Love requires patience. True love takes time to develop. Stay genuine and kind, your soulmate is on the way.',
      'Your charm is rising and attracting others. Choose wisely and find someone truly compatible.',
      'You may face some romantic challenges, but these are growth opportunities. Face them bravely for a more mature love.'
    ],
    'Career': [
      'Your career prospects look excellent. Great opportunities are coming. Seize the moment and showcase your talents.',
      'Work challenges ahead, but they prove your capabilities. Stay positive and overcome obstacles.',
      'Strong mentor luck. Seniors or leaders will recognize your talent. Learn and consult for career growth.',
      'Focus on steady progress. Concentrate on improving professional skills for a solid foundation.'
    ],
    'Wealth': [
      'Excellent wealth fortune with unexpected gains. Plan wisely and avoid impulsive spending.',
      'Stable regular income, moderate windfall luck. Work steadily for gradual income growth. Consider stable investments.',
      'Avoid high-risk investments now. Conservative financial management is best. Save and accumulate gradually.',
      'New income sources may appear through side jobs or freelancing. Seize opportunities without affecting your main work.'
    ],
    'Study': [
      'Excellent study fortune. Great time for self-improvement. Keep working hard for notable progress.',
      'Need more focus and discipline. Reduce distractions and find your learning method for better efficiency.',
      'Consult teachers and classmates more. Team learning works better. Don\'t fear mistakes - they\'re the best teachers.',
      'Good exam luck, but don\'t be complacent. Stay calm and perform normally for good results.'
    ]
  };

  const topicAnswers = answers[topic] || answers['Love'];
  return topicAnswers[Math.floor(Math.random() * topicAnswers.length)];
}

