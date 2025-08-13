import { MapMarkerType, MapPolylineType } from '@/types/map'
import pointIcon from "@/assets/iconfont/point-purple.png"
import { generateRandomHash } from '@/utils/tools'
import { RecommendItemType } from '@/types/common'

// 示例数据
const callout = {
  content: '天安门广场',
  bgColor: '#fff',
  color: '#000',
  fontSize: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#000',
  display: 'ALWAYS',
  textAlign: 'center',
  padding: 10,
  anchorX: 0.5,
  anchorY: 0.5,
} as const

export const exampleMarkers: MapMarkerType[] = [
  {
    id: Number(generateRandomHash('0123456789', 6)),
    latitude: 39.90923,
    longitude: 116.397428,
    iconPath: pointIcon,
    width: 32,
    height: 32,
    anchor: {
      x: 0.5,
      y: 0.5
    },
    callout: {
      ...callout,
      content: '天安门广场',
    }
  },
  {
    id: Number(generateRandomHash('0123456789', 6)),
    latitude: 39.91923,
    longitude: 116.407428,
    iconPath: pointIcon,
    width: 32,
    height: 32,
    anchor: {
      x: 0.5,
      y: 0.5
    },
    callout: {
      ...callout,
      content: '故宫博物院'
    }
  },
  {
    id: Number(generateRandomHash('0123456789', 6)),
    latitude: 39.92923,
    longitude: 116.417428,
    iconPath: pointIcon,
    width: 32,
    height: 32,
    anchor: {
      x: 0.5,
      y: 0.5
    },
    callout: {
      ...callout,
      content: '景山公园'
    }
  }
]

export const examplePolylines: MapPolylineType[] = [
  {
    points: [
      { latitude: 39.90923, longitude: 116.397428 },
      { latitude: 39.91923, longitude: 116.407428 },
      { latitude: 39.92923, longitude: 116.417428 }
    ],
    color: '#667eea',
    width: 6,
  }
]

export const exampleRecommendList: Array<RecommendItemType> = [
  {
    address: '天安门广场',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675812.png',
    rate: '4.5',
    price: '100',
    type: '景点',
    location: {
      latitude: 39.90923,
      longitude: 116.397428
    }
  },
  {
    address: '故宫博物院',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675813.png',
    rate: '4.8',
    price: '120',
    type: '景点',
    location: {
      latitude: 39.91923,
      longitude: 116.407428
    }
  },
  {
    address: '颐和园',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675814.png',
    rate: '4.6',
    price: '80',
    type: '景点',
    location: {
      latitude: 39.92923,
      longitude: 116.417428
    }
  },
  {
    address: '八达岭长城',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675815.png',
    rate: '4.7',
    price: '150',
    type: '景点',
    location: {
      latitude: 39.93923,
      longitude: 116.427428
    }
  },
  {
    address: '圆明园遗址公园',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675816.png',
    rate: '4.3',
    price: '60',
    type: '景点',
    location: {
      latitude: 39.94923,
      longitude: 116.437428
    }
  },
  {
    address: '全聚德烤鸭店',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675817.png',
    rate: '4.4',
    price: '200',
    type: '美食',
    location: {
      latitude: 39.95923,
      longitude: 116.447428
    }
  },
  {
    address: '老北京炸酱面',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675818.png',
    rate: '4.2',
    price: '50',
    type: '美食',
    location: {
      latitude: 39.96923,
      longitude: 116.457428
    }
  },
  {
    address: '北京饭店',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675819.png',
    rate: '4.6',
    price: '800',
    type: '住宿',
    location: {
      latitude: 39.97923,
      longitude: 116.467428
    }
  },
  {
    address: '王府井商业街',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675820.png',
    rate: '4.1',
    price: '0',
    type: '购物',
    location: {
      latitude: 39.98923,
      longitude: 116.477428
    }
  },
  {
    address: '南锣鼓巷',
    cover: 'https://s3-gz01.didistatic.com/packages-mait/img/T1EvNSLP9H1753686675821.png',
    rate: '4.3',
    price: '0',
    type: '文化',
    location: {
      latitude: 39.99923,
      longitude: 116.487428
    }
  }
]