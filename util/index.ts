export function getMidCoordinate(x1: number, x2: number) {
  return Math.floor(x2 - x1) / 2 + x1
}

export function formatChartNumber(chartParam,chartitem, decimalPlaces,isthousands,ispercent,unit,numberformat) {
  if(chartParam && chartParam.seriesType == 'pie') {
    const value = chartParam.value;
    const result =  formatNumber(value, decimalPlaces, isthousands, ispercent, unit);
    return chartParam.data.name+":"+result;
  }else if(chartParam && (chartParam.seriesType == 'bar' || chartParam.seriesType == 'line')) {
    const encodex = chartitem.originname == "横向柱状图" || chartitem.originname == "堆积条形图" ? chartParam?.encode?.y?.[0]:chartParam?.encode?.x?.[0];
    const encodey = chartitem.originname == "横向柱状图" || chartitem.originname == "堆积条形图" ? chartParam?.encode?.x?.[0]:chartParam?.encode?.y?.[0];
    const value = chartParam.data?.[encodey];
    const name = chartParam.data?.[encodex];
    const result =  formatNumber(value, decimalPlaces, isthousands, ispercent, unit);
    return name+":"+result;
  }else if(chartParam && chartParam.seriesType == 'gauge') {
    const result =  formatNumber(chartParam.value, decimalPlaces, isthousands, ispercent, unit);
    return result;
  }
  return chartParam.value;
}
export function formatCombinationNumber(chartParam,chartitem, decimalPlaces,isthousands,ispercent,unit,numberformat) {
    let result = '';
    let name;
    for (var i = 0; i < chartParam.length; i++) {
      const encodex = chartParam?.[i]?.encode?.x?.[0];
      const encodey = chartParam?.[i]?.encode?.y?.[0];
      const value = chartParam?.[i]?.data?.[encodey];
      name = chartParam?.[i]?.data?.[encodex];
      const seriesName = chartParam?.[i].seriesName;
      const seriesNumberFormat = numberformat?.filter((v: any) => v.key == seriesName)?.[0];
      if(seriesNumberFormat){
        const formatresult =  formatNumber(value, seriesNumberFormat.decimalPlace, seriesNumberFormat.enableThousands, seriesNumberFormat.isPencent, seriesNumberFormat.unit);

        result += seriesName + ' : ' + formatresult + '<br>';
      }else{
        const formatresult =  formatNumber(value, decimalPlaces, isthousands, ispercent, unit);
        result += seriesName + ' : ' + formatresult + '<br>'; 
      }
    }
    return name +"<br>"+result;
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

