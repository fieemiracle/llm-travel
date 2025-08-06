// 底部词条
export const HOME_BOTTOM_TIPS = [
  '➡️ 创建新行程',
  '🍲 附近热门必吃餐厅',
  '🚶 北京周末去哪玩',
  '✈️ 特价机票限时抢购',
  '🏨 北京精品民宿推荐',
  '🍜 本地人最爱的小吃街',
  '🌄 黄山日出观赏指南',
  '🛍️ 免税店购物攻略',
  '🚗 自驾游路线规划',
  '📸 网红打卡地合集',
  '🍵 成都茶馆体验',
  '🚲 城市骑行路线推荐',
  '🎢 上海迪士尼必玩项目',
  '🏞️ 云南小众秘境',
  '🛫 行李打包清单',
  '🍻 长沙夜生活地图',
  '🎭 传统文化体验活动',
  '🏖️ 三亚潜水好去处',
  '🚆 高铁周边游推荐',
  '🍎 健康旅行饮食建议',
  '🛌 机场过夜休息室',
  '🎫 景点预约避坑指南',
  '🧳 旅行必备好物清单'
]

// 轮播图数据
export const CAROUSEL_DATA = [
  {
    id: '1',
    title: '湖海园韵',
    subtitle: '1天15个地点',
    image: 'https://picsum.photos/600/300?random=1',
    tags: ['游', '吃', '娱'],
    location: {
      latitude: 30.2741,      // 杭州西湖
      longitude: 120.1551
    }
  },
  {
    id: '2',
    title: '故宫·天安门游',
    subtitle: '1天14个地点',
    image: 'https://picsum.photos/600/300?random=2',
    tags: ['游', '吃', '娱'],
    location: {
      latitude: 39.9163,      // 北京故宫
      longitude: 116.3972
    }
  },
  {
    id: '3',
    title: '经典双园',
    subtitle: '1天14个地点',
    image: 'https://picsum.photos/600/300?random=3',
    tags: ['游', '吃', '娱'],
    location: {
      latitude: 31.2304,      // 上海外滩
      longitude: 121.4737
    }
  },
  {
    id: '4',
    title: '山水甲天下',
    subtitle: '2天20个地点',
    image: 'https://picsum.photos/600/300?random=4',
    tags: ['游', '摄'],
    location: {
      latitude: 25.2736,      // 桂林漓江
      longitude: 110.2900
    }
  },
  {
    id: '5',
    title: '古城探秘',
    subtitle: '3天25个地点',
    image: 'https://picsum.photos/600/300?random=5',
    tags: ['游', '古'],
    location: {
      latitude: 34.3416,      // 西安兵马俑
      longitude: 108.9398
    }
  }
]

// 天气数据
export const WEATHER_DATA = {
  city: '北京',
  temperature: '23°~30°',
  condition: 'sunny',
  description: '晴天'
}

// 推荐内容tabs
export const RECOMMEND_TABS = [
  { id: 'travel', name: '我的行程', active: false },
  { id: 'classic', name: '经典必游', active: true },
  { id: 'couple', name: '情侣约会', active: false },
  { id: 'parent', name: '亲子带娃', active: false }
]

// 推荐内容数据
export const RECOMMEND_DATA = {
  travel: [
    {
      id: '1',
      title: '我的北京3日游',
      duration: '3天',
      spots: 12,
      image: 'https://picsum.photos/200/150?random=10',
      footprint: [
        {
          address: '北京故宫',
          latitude: 39.9163,
          longitude: 116.3972,
          visitTime: '2023-05-10 09:00'
        },
        {
          address: '北京天安门广场',
          latitude: 39.9035,
          longitude: 116.3976,
          visitTime: '2023-05-10 11:30'
        },
        {
          address: '颐和园',
          latitude: 39.9997,
          longitude: 116.2754,
          visitTime: '2023-05-11 10:00'
        },
        {
          address: '八达岭长城',
          latitude: 40.3596,
          longitude: 116.0204,
          visitTime: '2023-05-12 08:00'
        },
        {
          address: '南锣鼓巷',
          latitude: 39.9408,
          longitude: 116.4036,
          visitTime: '2023-05-12 19:00'
        }
      ]
    },
    {
      id: '2',
      title: '我的上海周末游',
      duration: '2天',
      spots: 8,
      image: 'https://picsum.photos/200/150?random=11',
      footprint: [
        {
          address: '上海外滩',
          latitude: 31.2397,
          longitude: 121.4998,
          visitTime: '2023-06-15 16:00'
        },
        {
          address: '东方明珠塔',
          latitude: 31.2399,
          longitude: 121.4997,
          visitTime: '2023-06-15 18:30'
        },
        {
          address: '南京路步行街',
          latitude: 31.2385,
          longitude: 121.4773,
          visitTime: '2023-06-15 20:00'
        },
        {
          address: '豫园',
          latitude: 31.2270,
          longitude: 121.4917,
          visitTime: '2023-06-16 09:00'
        },
        {
          address: '上海迪士尼乐园',
          latitude: 31.1440,
          longitude: 121.6570,
          visitTime: '2023-06-16 13:00'
        }
      ]
    },
    {
      id: '3',
      title: '成都美食之旅',
      duration: '4天',
      spots: 15,
      image: 'https://picsum.photos/200/150?random=12',
      footprint: [
        {
          address: '宽窄巷子',
          latitude: 30.6636,
          longitude: 104.0663,
          visitTime: '2023-07-20 10:00'
        },
        {
          address: '锦里古街',
          latitude: 30.6459,
          longitude: 104.0484,
          visitTime: '2023-07-20 14:00'
        },
        {
          address: '大熊猫繁育研究基地',
          latitude: 30.7335,
          longitude: 104.1587,
          visitTime: '2023-07-21 08:30'
        },
        {
          address: '都江堰',
          latitude: 31.0034,
          longitude: 103.6131,
          visitTime: '2023-07-22 09:00'
        },
        {
          address: '青城山',
          latitude: 30.9008,
          longitude: 103.5736,
          visitTime: '2023-07-23 07:00'
        }
      ]
    }
  ],
  classic: [
    {
      id: '1',
      title: '湖海园韵·杭州西湖',
      duration: '1天',
      spots: 15,
      image: 'https://picsum.photos/200/150?random=20',
      location: {
        latitude: 30.2549,  // 西湖断桥残雪
        longitude: 120.1474
      }
    },
    {
      id: '2',
      title: '故宫·天安门经典游',
      duration: '1天',
      spots: 14,
      image: 'https://picsum.photos/200/150?random=21',
      location: {
        latitude: 39.9163,  // 故宫博物院
        longitude: 116.3972
      }
    },
    {
      id: '3',
      title: '苏州双园记',
      duration: '1天',
      spots: 14,
      image: 'https://picsum.photos/200/150?random=22',
      location: {
        latitude: 31.3260,  // 拙政园
        longitude: 120.6273
      }
    }
  ],
  couple: [
    {
      id: '1',
      title: '上海外滩夜景游',
      duration: '1天',
      spots: 6,
      image: 'https://picsum.photos/200/150?random=30',
      location: {
        latitude: 31.2397,  // 外滩观景台
        longitude: 121.4998
      }
    },
    {
      id: '2',
      title: '鼓浪屿咖啡时光',
      duration: '半天',
      spots: 4,
      image: 'https://picsum.photos/200/150?random=31',
      location: {
        latitude: 24.4480,  // 鼓浪屿最美转角
        longitude: 118.0669
      }
    }
  ],
  parent: [
    {
      id: '1',
      title: '广州长隆欢乐世界',
      duration: '1天',
      spots: 5,
      image: 'https://picsum.photos/200/150?random=40',
      location: {
        latitude: 23.0038,  // 长隆旅游度假区
        longitude: 113.3246
      }
    },
    {
      id: '2',
      title: '北京科技馆探索',
      duration: '半天',
      spots: 3,
      image: 'https://picsum.photos/200/150?random=41',
      location: {
        latitude: 39.9138,  // 中国科技馆新馆
        longitude: 116.4066
      }
    }
  ]
}

// 历史对话数据
export const MOCK_CHAT_HISTORY = [
  {
    id: '1',
    title: '有哪些适合独处的咖啡厅？',
    messageCount: 2,
    date: '2025/07/31',
    images: [
      'https://picsum.photos/150/150?random=1',
      'https://picsum.photos/150/150?random=2',
      'https://picsum.photos/150/150?random=3'
    ]
  },
  {
    id: '2',
    title: '北京周末去哪玩？',
    messageCount: 2,
    date: '2025/03/05',
    images: [
      'https://picsum.photos/150/150?random=4',
      'https://picsum.photos/150/150?random=5',
      'https://picsum.photos/150/150?random=6'
    ]
  },
  {
    id: '3',
    title: '有哪些适合独处的安静咖啡厅',
    messageCount: 1,
    date: '2025/01/15',
    images: [
      'https://picsum.photos/150/150?random=7',
      'https://picsum.photos/150/150?random=8'
    ]
  },
  {
    id: '4',
    title: '有哪些适合独处的安静咖啡厅',
    messageCount: 1,
    date: '2025/01/15',
    images: [
      'https://picsum.photos/150/150?random=7',
      'https://picsum.photos/150/150?random=8'
    ]
  },
  {
    id: '5',
    title: '有哪些适合独处的安静咖啡厅',
    messageCount: 1,
    date: '2025/01/15',
    images: [
      'https://picsum.photos/150/150?random=7',
      'https://picsum.photos/150/150?random=8'
    ]
  }
]

// 我的行程数据
export const MOCK_TRAVEL_PLANS = [
  {
    id: '1',
    title: '北京周末去哪玩？',
    duration: '2天',
    spotCount: 11,
    places: ['颐和园', '小吊梨汤', '北京烤鸭店', '杨春园'],
    tags: ['游', '吃', '娱', '住'],
    thumbnail: 'https://picsum.photos/150/150?random=10'
  },
  {
    id: '2',
    title: '规划北京三日游',
    duration: '2天',
    spotCount: 11,
    places: ['颐和园', '万柳湖畔', '烤鸭', '柳叶花园餐厅(中关村海淀公园店)'],
    tags: ['游', '吃', '娱', '住'],
    thumbnail: 'https://picsum.photos/150/150?random=11'
  }
]

// 用户信息
export const MOCK_USER_INFO = {
  id: 'ECv622912297',
  nickname: 'ECv622912297',
  avatar: '🐹',
  companionDays: 150,
  isOnline: true
}