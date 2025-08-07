// 底部词条
export const HOME_BOTTOM_TIPS = [
  {
    type: 'popup',
    name: '➡️ 创建新行程'
  },
  {
    type: 'text',
    name: '🍲 附近热门必吃餐厅'
  },
  {
    type: 'text',
    name: '🚶 北京周末去哪玩'
  },
  {
    type: 'text',
    name: '✈️ 特价机票限时抢购'
  },
  {
    type: 'text',
    name: '🏨 北京精品民宿推荐'
  },
  {
    type: 'text',
    name: '🍜 本地人最爱的小吃街'
  },
  {
    type: 'text',
    name: '🌄 黄山日出观赏指南'
  },
  {
    type: 'text',
    name: '🛍️ 免税店购物攻略'
  },
  {
    type: 'text',
    name: '🚗 自驾游路线规划'
  },
  {
    type: 'text',
    name: '📸 网红打卡地合集'
  },
  {
    type: 'text',
    name: '🍵 成都茶馆体验'
  },
  {
    type: 'text',
    name: '🚲 城市骑行路线推荐'
  },
  {
    type: 'text',
    name: '🎢 上海迪士尼必玩项目'
  },
  {
    type: 'text',
    name: '🏞️ 云南小众秘境'
  },
  {
    type: 'text',
    name: '🛫 行李打包清单'
  },
  {
    type: 'text',
    name: '🍻 长沙夜生活地图'
  },
  {
    type: 'text',
    name: '🎭 传统文化体验活动'
  },
  {
    type: 'text',
    name: '🏖️ 三亚潜水好去处'
  },
  {
    type: 'text',
    name: '🚆 高铁周边游推荐'
  },
  {
    type: 'text',
    name: '🍎 健康旅行饮食建议'
  },
  {
    type: 'text',
    name: '🛌 机场过夜休息室'
  },
  {
    type: 'text',
    name: '🎫 景点预约避坑指南'
  },
  {
    type: 'text',
    name: '🧳 旅行必备好物清单'
  }
]

// 轮播图数据
export const CAROUSEL_DATA = [
  {
    id: '1',
    title: '湖海园韵·杭州经典游',
    subtitle: '1天5个地点',
    image: 'https://picsum.photos/600/300?random=1',
    tags: ['游', '吃', '娱'],
    tourdetail: [
      {
        day: 'Day 1',
        footprint: [
          {
            address: '西湖断桥',
            location: { latitude: 30.2550, longitude: 120.1475 },
            time: '09:00-11:00'
          },
          {
            address: '雷峰塔',
            location: { latitude: 30.2333, longitude: 120.1485 },
            time: '11:30-13:00'
          },
          {
            address: '楼外楼餐厅',
            location: { latitude: 30.2538, longitude: 120.1465 },
            time: '13:00-14:30'
          },
          {
            address: '灵隐寺',
            location: { latitude: 30.2464, longitude: 120.0969 },
            time: '15:00-17:00'
          },
          {
            address: '河坊街夜市',
            location: { latitude: 30.2375, longitude: 120.1682 },
            time: '18:30-21:00'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: '故宫·天安门深度游',
    subtitle: '1天4个地点',
    image: 'https://picsum.photos/600/300?random=2',
    tags: ['游', '史'],
    tourdetail: [
      {
        day: 'Day 1',
        footprint: [
          {
            address: '天安门广场',
            location: { latitude: 39.9035, longitude: 116.3976 },
            time: '08:00-10:00'
          },
          {
            address: '故宫博物院',
            location: { latitude: 39.9163, longitude: 116.3972 },
            time: '10:30-14:00'
          },
          {
            address: '景山公园',
            location: { latitude: 39.9235, longitude: 116.3912 },
            time: '14:30-16:00'
          },
          {
            address: '王府井大街',
            location: { latitude: 39.9139, longitude: 116.4137 },
            time: '17:00-20:00'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: '桂林山水2日游',
    subtitle: '2天8个地点',
    image: 'https://picsum.photos/600/300?random=3',
    tags: ['游', '摄'],
    tourdetail: [
      {
        day: 'Day 1',
        footprint: [
          {
            address: '漓江游船',
            location: { latitude: 25.2736, longitude: 110.2900 },
            time: '09:00-12:00'
          },
          {
            address: '象鼻山公园',
            location: { latitude: 25.2625, longitude: 110.2964 },
            time: '13:30-15:30'
          },
          {
            address: '两江四湖夜游',
            location: { latitude: 25.2775, longitude: 110.2947 },
            time: '19:00-21:00'
          }
        ]
      },
      {
        day: 'Day 2',
        footprint: [
          {
            address: '龙脊梯田',
            location: { latitude: 25.7589, longitude: 110.1492 },
            time: '08:00-12:00'
          },
          {
            address: '阳朔西街',
            location: { latitude: 24.7785, longitude: 110.4966 },
            time: '14:00-17:00'
          }
        ]
      }
    ]
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
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '北京故宫',
              location: { latitude: 39.9163, longitude: 116.3972 },
              visitTime: '2023-05-10 09:00'
            },
            {
              address: '北京天安门广场',
              location: { latitude: 39.9035, longitude: 116.3976 },
              visitTime: '2023-05-10 11:30'
            },
            {
              address: '颐和园',
              location: { latitude: 39.9997, longitude: 116.2754 },
              visitTime: '2023-05-11 10:00'
            },
          ]
        }, {
          day: 'Day 2',
          footprint: [
            {
              address: '八达岭长城',
              location: { latitude: 40.3596, longitude: 116.0204 },
              visitTime: '2023-05-12 08:00'
            },
            {
              address: '南锣鼓巷',
              location: { latitude: 39.9408, longitude: 116.4036 },
              visitTime: '2023-05-12 19:00'
            }
          ]
        }
      ],
    },
    {
      id: '2',
      title: '我的上海周末游',
      duration: '2天',
      spots: 8,
      image: 'https://picsum.photos/200/150?random=11',
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '上海外滩',
              location: { latitude: 31.2397, longitude: 121.4998 },
              visitTime: '2023-06-15 16:00'
            },
            {
              address: '东方明珠塔',
              location: { latitude: 31.2399, longitude: 121.4997 },
              visitTime: '2023-06-15 18:30'
            },
            {
              address: '南京路步行街',
              location: { latitude: 31.2385, longitude: 121.4773 },
              visitTime: '2023-06-15 20:00'
            },
          ]
        },
        {
          day: 'Day 2',
          footprint: [
            {
              address: '豫园',
              location: { latitude: 31.2270, longitude: 121.4917 },
              visitTime: '2023-06-16 09:00'
            },
            {
              address: '上海迪士尼乐园',
              location: { latitude: 31.1440, longitude: 121.6570 },
              visitTime: '2023-06-16 13:00'
            }
          ]
        }
      ],
    },
    {
      id: '3',
      title: '成都美食之旅',
      duration: '4天',
      spots: 15,
      image: 'https://picsum.photos/200/150?random=12',
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '宽窄巷子',
              location: { latitude: 30.6636, longitude: 104.0663 },
              visitTime: '2023-07-20 10:00'
            },
            {
              address: '锦里古街',
              location: { latitude: 30.6459, longitude: 104.0484 },
              visitTime: '2023-07-20 14:00'
            },
            {
              address: '大熊猫繁育研究基地',
              location: { latitude: 30.7335, longitude: 104.1587 },
              visitTime: '2023-07-21 08:30'
            },
          ]
        },
        {
          day: 'Day 2',
          footprint: [
            {
              address: '都江堰',
              location: { latitude: 31.0034, longitude: 103.6131 },
              visitTime: '2023-07-22 09:00'
            },
            {
              address: '青城山',
              location: { latitude: 30.9008, longitude: 103.5736 },
              visitTime: '2023-07-23 07:00'
            }
          ]
        }
      ],
    }
  ],
  classic: [
    {
      id: '1',
      title: '湖海园韵·杭州西湖',
      duration: '1天',
      spots: 15,
      image: 'https://picsum.photos/200/150?random=20',
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '西湖断桥残雪',
              location: { latitude: 30.2549, longitude: 120.1474 },
              visitTime: '2023-05-10 09:00'
            },
            {
              address: '雷峰塔',
              location: { latitude: 30.2333, longitude: 120.1485 },
              visitTime: '2023-05-10 11:30'
            },
            {
              address: '楼外楼餐厅',
              location: { latitude: 30.2538, longitude: 120.1465 },
              visitTime: '2023-05-10 13:00'
            },
            {
              address: '灵隐寺',
              location: { latitude: 30.2464, longitude: 120.0969 },
              visitTime: '2023-05-10 15:00'
            },
            {
              address: '河坊街夜市',
              location: { latitude: 30.2375, longitude: 120.1682 },
              visitTime: '2023-05-10 18:30'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: '故宫·天安门经典游',
      duration: '1天',
      spots: 14,
      image: 'https://picsum.photos/200/150?random=21',
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '天安门广场',
              location: { latitude: 39.9035, longitude: 116.3976 },
              visitTime: '2023-05-10 09:00'
            },
            {
              address: '故宫博物院',
              location: { latitude: 39.9163, longitude: 116.3972 },
              visitTime: '2023-05-10 11:30'
            },
            {
              address: '景山公园',
              location: { latitude: 39.9235, longitude: 116.3912 },
              visitTime: '2023-05-10 14:30'
            },
          ]
        }
      ]
    },
    {
      id: '3',
      title: '苏州双园记',
      duration: '1天',
      spots: 14,
      image: 'https://picsum.photos/200/150?random=22',
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '拙政园',
              location: { latitude: 31.3260, longitude: 120.6273 },
              visitTime: '2023-05-10 09:00'
            },
            {
              address: '苏州博物馆',
              location: { latitude: 31.3322, longitude: 120.6196 },
              visitTime: '2023-05-10 11:30'
            },
          ]
        }
      ]
    }
  ],
  couple: [
    {
      id: '1',
      title: '上海外滩夜景游',
      duration: '1天',
      spots: 6,
      image: 'https://picsum.photos/200/150?random=30',
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '外滩观景台',
              location: { latitude: 31.2397, longitude: 121.4998 },
              visitTime: '2023-05-10 09:00'
            },
            {}
          ]
        }
      ]
    },
    {
      id: '2',
      title: '鼓浪屿咖啡时光',
      duration: '半天',
      spots: 4,
      image: 'https://picsum.photos/200/150?random=31',
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '鼓浪屿最美转角',
              location: { latitude: 24.4480, longitude: 118.0669 },
              visitTime: '2023-05-10 09:00'
            }
          ]
        }
      ]
    }
  ],
  parent: [
    {
      id: '1',
      title: '广州长隆欢乐世界',
      duration: '1天',
      spots: 5,
      image: 'https://picsum.photos/200/150?random=40',
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '长隆欢乐世界',
              location: { latitude: 23.0038, longitude: 113.3246 },
              visitTime: '2023-05-10 09:00'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: '北京科技馆探索',
      duration: '半天',
      spots: 3,
      image: 'https://picsum.photos/200/150?random=41',
      tourdetail: [
        {
          day: 'Day 1',
          footprint: [
            {
              address: '中国科技馆新馆',
              location: { latitude: 39.9138, longitude: 116.4066 },
              visitTime: '2023-05-10 09:00'
            }
          ]
        }
      ]
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