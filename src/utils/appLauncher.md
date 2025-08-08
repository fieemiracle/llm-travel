# 应用调起功能使用说明

## 功能概述

当用户点击推荐项目时，系统会弹出选择框，让用户选择要调起的应用（美团或大众点评）。

## 实现原理

1. **小程序调起**: 使用 `Taro.navigateToMiniProgram()` 调起对应的小程序
2. **应用商店**: 如果小程序调起失败，会引导用户下载对应的应用
3. **智能选择**: 根据推荐项目类型自动选择最合适的应用

## 应用配置

### 美团
- 小程序 AppID: `wx2c348cf579062e56`
- 搜索路径: `pages/search/search?keyword=`
- 应用商店链接: 
  - iOS: `https://apps.apple.com/cn/app/mei-tuan-wai-mai-dian-ping/id423084029`
  - Android: `https://play.google.com/store/apps/details?id=com.sankuai.meituan`

### 大众点评
- 小程序 AppID: `wxde8ac0a21135c07d`
- 搜索路径: `pages/search/search?keyword=`
- 应用商店链接:
  - iOS: `https://apps.apple.com/cn/app/da-zhong-dian-ping/id340934251`
  - Android: `https://play.google.com/store/apps/details?id=com.dianping.v1`

## 使用方式

```tsx
// 在组件中调用
const handleAppSelection = (item: RecommendItemType) => {
  Taro.showActionSheet({
    itemList: ['美团', '大众点评'],
    success: (res) => {
      const { address, type } = item
      switch (res.tapIndex) {
        case 0:
          // 调起美团
          launchMeituan({
            type: type === '景点' ? 'scenic' : type === '美食' ? 'food' : 'search',
            keyword: address
          })
          break
        case 1:
          // 调起大众点评
          launchDianping({
            type: type === '景点' ? 'scenic' : type === '美食' ? 'food' : 'search',
            keyword: address
          })
          break
      }
    }
  })
}
```

## 类型映射

| 推荐类型 | 美团类型 | 大众点评类型 | 说明 |
|---------|---------|-------------|------|
| 景点 | scenic | scenic | 景点信息 |
| 美食 | food | food | 美食推荐 |
| 住宿 | hotel | hotel | 酒店预订 |
| 购物 | search | search | 购物搜索 |
| 文化 | search | search | 文化搜索 |

## 注意事项

1. **小程序限制**: 某些小程序可能无法直接调起，会显示下载提示
2. **权限问题**: 需要在小程序配置中添加对应的小程序 AppID
3. **用户体验**: 提供下载链接复制功能，方便用户下载应用
4. **错误处理**: 完善的错误处理和用户提示

## 扩展功能

可以进一步扩展支持更多应用：
- 携程（酒店预订）
- 去哪儿（旅游服务）
- 马蜂窝（旅游攻略）
- 小红书（种草推荐）

## 配置要求

在小程序的 `project.config.json` 中需要配置：

```json
{
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  },
  "requiredPrivateInfos": [
    "getLocation"
  ]
}
``` 