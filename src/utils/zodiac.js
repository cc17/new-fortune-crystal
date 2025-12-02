// 计算生肖
export function getChineseZodiac(year) {
  const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  return zodiacs[(year - 4) % 12];
}

// 计算星座
export function getConstellation(month, day) {
  const constellations = [
    { name: '摩羯座', endDay: 19 },
    { name: '水瓶座', endDay: 18 },
    { name: '双鱼座', endDay: 20 },
    { name: '白羊座', endDay: 19 },
    { name: '金牛座', endDay: 20 },
    { name: '双子座', endDay: 21 },
    { name: '巨蟹座', endDay: 22 },
    { name: '狮子座', endDay: 22 },
    { name: '处女座', endDay: 22 },
    { name: '天秤座', endDay: 22 },
    { name: '天蝎座', endDay: 21 },
    { name: '射手座', endDay: 21 },
    { name: '摩羯座', endDay: 31 }
  ];

  const monthIndex = month - 1;
  if (day <= constellations[monthIndex].endDay) {
    return constellations[monthIndex].name;
  } else {
    return constellations[monthIndex + 1].name;
  }
}

// Mock答案生成器
export function generateAnswer(topic, name, birthday) {
  const answers = {
    '爱情': [
      '近期你的爱情运势非常旺盛，单身的你有机会遇到心仪的对象。已有伴侣的人感情会更加稳定，建议多沟通交流。',
      '爱情方面需要更多的耐心，真爱需要时间来培养。保持真诚和善良，你的真命天子/天女正在路上。',
      '你的魅力指数正在上升，周围会有人被你吸引。但要注意甄别，选择真正适合自己的人。',
      '感情上可能会遇到一些小波折，但这都是成长的机会。勇敢面对，你会收获更成熟的爱情。'
    ],
    '事业': [
      '事业运势看好，近期会有不错的发展机会。把握住关键时刻，展现自己的才华，升职加薪指日可待。',
      '工作中可能会遇到挑战，但这正是证明自己能力的好机会。保持积极态度，困难终将过去。',
      '贵人运旺盛，会有前辈或领导赏识你的才能。多学习，多请教，对事业发展大有裨益。',
      '适合稳扎稳打，不宜冒进。专注于提升专业技能，为未来的发展打下坚实基础。'
    ],
    '财富': [
      '财运亨通，会有意外之财降临。但要注意合理规划，不要盲目消费。',
      '正财运稳定，偏财运一般。脚踏实地工作，收入会稳步增长。可以考虑一些稳健的投资。',
      '近期不宜进行高风险投资，保守理财为上策。开源节流，积少成多。',
      '会有新的收入来源，可能是副业或兼职。把握机会，但要注意不要影响主业。'
    ],
    '学业': [
      '学习运势极佳，是提升自己的好时机。坚持努力，成绩会有明显进步。',
      '需要更加专注和自律，减少外界干扰。找到适合自己的学习方法，效率会大大提高。',
      '可以多向老师和同学请教，团队学习效果会更好。不要害怕犯错，错误是最好的老师。',
      '考试运不错，但不能掉以轻心。保持平常心，发挥出正常水平就能取得好成绩。'
    ]
  };

  const topicAnswers = answers[topic] || answers['爱情'];
  return topicAnswers[Math.floor(Math.random() * topicAnswers.length)];
}

