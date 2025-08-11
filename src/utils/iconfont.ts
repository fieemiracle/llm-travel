// iconfont图标常量
// 使用HTML实体编码会被Text组件当作普通文本，应该使用Unicode字符

import { convertIconfontEntitiesToUnicode } from "./tools";

// 可以使用 tools.ts 中的 iconfontEntityToUnicode() 函数来转换实体编码
export const ICONFONT_ICONS_ENTITY = {
  // 这里请根据iconfont项目中的实际图标名称来修改
  // 例如：如果图标类名是 home，那么这里就是 'home'
  
  AVATAR_AI: '&#xe6a8;',
  THUMB_UP: '&#xe60b;',
  THUMB_UP_GREY: '&#xe945;',
  THUMB_DOWN: '&#xe603;',
  THUMB_DOWN_GREY: '&#xe946;',
  KEYBOARD: '&#xe618;',
  AUDIO: '&#xe606;',
  COPY: '&#xe67b;',
  EDIT: '&#xe944;',
  LOADING: '&#xe608;',
  REGENERATE: '&#xe612;',
  SEND: '&#xe888;',
  STOP: '&#xe842;',
  SHARE: '&#xe655;',
  SHARE1: '&#xe61d;',
  ANCHOR_DOWN: '&#xe664;',
  ARROW_LEFT: '&#xe60d;',
  ARROW_DOWN: '&#xe665;',
  CHANGE: '&#xe650;',
  DELETE: '&#xe60f;',
  SETTING: '&#xe623;',
} as const;

export const ICONFONT_ICONS = convertIconfontEntitiesToUnicode(ICONFONT_ICONS_ENTITY)
// console.log('ICONFONT_ICONS>>>>>>>', ICONFONT_ICONS)

export type IconFontType = typeof ICONFONT_ICONS[keyof typeof ICONFONT_ICONS]; 