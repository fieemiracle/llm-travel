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
  
  console.log('result=====', length, result)
  return result;
}