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
    tags: ['游', '吃', '娱']
  },
  {
    id: '2',
    title: '故宫·天安门游',
    subtitle: '1天14个地点',
    image: 'https://picsum.photos/600/300?random=2',
    tags: ['游', '吃', '娱']
  },
  {
    id: '3',
    title: '经典双园',
    subtitle: '1天14个地点',
    image: 'https://picsum.photos/600/300?random=3',
    tags: ['游', '吃', '娱']
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
      image: 'https://picsum.photos/200/150?random=10'
    },
    {
      id: '2',
      title: '我的上海周末游',
      duration: '2天',
      spots: 8,
      image: 'https://picsum.photos/200/150?random=11'
    }
  ],
  classic: [
    {
      id: '1',
      title: '湖海园韵',
      duration: '1天',
      spots: 15,
      image: 'https://picsum.photos/200/150?random=20'
    },
    {
      id: '2',
      title: '故宫·天安门游',
      duration: '1天',
      spots: 14,
      image: 'https://picsum.photos/200/150?random=21'
    },
    {
      id: '3',
      title: '经典双园',
      duration: '1天',
      spots: 14,
      image: 'https://picsum.photos/200/150?random=22'
    }
  ],
  couple: [
    {
      id: '1',
      title: '浪漫夜景游',
      duration: '1天',
      spots: 6,
      image: 'https://picsum.photos/200/150?random=30'
    },
    {
      id: '2',
      title: '情侣咖啡店打卡',
      duration: '半天',
      spots: 4,
      image: 'https://picsum.photos/200/150?random=31'
    }
  ],
  parent: [
    {
      id: '1',
      title: '亲子游乐园',
      duration: '1天',
      spots: 5,
      image: 'https://picsum.photos/200/150?random=40'
    },
    {
      id: '2',
      title: '科技馆探索',
      duration: '半天',
      spots: 3,
      image: 'https://picsum.photos/200/150?random=41'
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