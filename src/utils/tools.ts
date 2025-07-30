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