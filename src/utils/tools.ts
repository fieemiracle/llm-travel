/**
 * 将数组均分成n份
 * @param arr 要分割的数组
 * @param n 要分割的份数
 * @returns 分割后的二维数组
 */
export function formatArrayByCustomLength<T>(arr: T[], n: number): T[][] {
  if (n <= 0) return [];
  if (n === 1) return [arr];
  
  const result: T[][] = [];
  const length = arr.length;
  const minChunkSize = Math.floor(length / n);
  const remainder = length % n;
  
  let start = 0;
  let end = 0;
  
  for (let i = 0; i < n; i++) {
    end = start + minChunkSize + (i < remainder ? 1 : 0);
    result.push(arr.slice(start, end));
    start = end;
  }
  
  // console.log('切割后的数组为=====', length, result)
  return result;
}

/**
 * 生成随机哈希
 * @param chars 字符串
 * @param len 长度
 * @returns 随机哈希
 */
export const generateRandomHash = (chars?: string, length?: number) => {
  const str = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.!@#$%^&*()';
  const len = length || 10
  let hash = '';
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    hash += str[randomIndex];
  }
  return hash;
};

/**
 * 将HTML实体编码转换为Unicode字符
 * @param htmlEntity HTML实体编码，如 '&#xe6a8;' 或 '&amp;'
 * @returns Unicode字符，如 '\ue6a8' 或 '&'
 */
export function htmlEntityToUnicode(htmlEntity: string): string {
  // 创建临时DOM元素来解析HTML实体
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlEntity;
  return tempDiv.textContent || tempDiv.innerText || '';
}

/**
 * 批量转换HTML实体编码为Unicode字符
 * @param entities 包含HTML实体编码的对象
 * @returns 转换后的对象
 */
export function convertHtmlEntitiesToUnicode<T extends Record<string, string>>(entities: T): T {
  const result = {} as T;
  
  for (const [key, value] of Object.entries(entities)) {
    if (typeof value === 'string' && value.includes('&#')) {
      (result as any)[key] = iconfontEntityToUnicode(value);
    } else {
      (result as any)[key] = value;
    }
  }
  
  return result;
}

/**
 * 批量转换iconfont实体编码为Unicode字符
 * @param entities 包含iconfont实体编码的对象
 * @returns 转换后的对象
 */
export function convertIconfontEntitiesToUnicode<T extends Record<string, string>>(entities: T): T {
  const result = {} as T;
  
  for (const [key, value] of Object.entries(entities)) {
    if (typeof value === 'string' && value.includes('&#x')) {
      (result as any)[key] = iconfontEntityToUnicode(value);
    } else {
      (result as any)[key] = value;
    }
  }
  
  return result;
}

/**
 * 将iconfont的HTML实体编码转换为Unicode字符
 * @param htmlEntity iconfont的HTML实体编码，如 '&#xe6a8;'
 * @returns Unicode字符，如 '\ue6a8'
 */
export function iconfontEntityToUnicode(htmlEntity: string): string {
  // 匹配 &#x 开头的十六进制实体编码
  const match = htmlEntity.match(/&#x([0-9a-fA-F]+);/);
  if (match) {
    const hexCode = match[1];
    const unicodeCode = parseInt(hexCode, 16);
    return String.fromCharCode(unicodeCode);
  }
  return htmlEntity;
}