export function getMidCoordinate(x1: number, x2: number) {
  return Math.floor(x2 - x1) / 2 + x1
}

export function formatNumber(num, decimalPlaces,isthousands,ispercent,unit) {
  const tranUnitNum = unit ? num/unit : num;
  const k = decimalPlaces?Math.pow(10, decimalPlaces):1;
  const bigNum = decimalPlaces?Math.round(tranUnitNum *k)/k.toFixed(decimalPlaces):tranUnitNum;//解决精度问题
  const roundedNum = Number(bigNum); // 先保留指定的小数位数
  const parts = roundedNum.toString().split('.');

  // 对整数部分添加千分位分隔符
  parts[0] = isthousands ? parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','):parts[0];

  // 如果有小数部分，则返回拼接后的字符串，否则只返回整数部分
  const result =  parts.length > 1 ? parts.join('.') : parts;
  return ispercent ? result+"%" : result;
}

