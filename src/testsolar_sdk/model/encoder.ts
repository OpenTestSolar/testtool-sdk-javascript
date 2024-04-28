function formatDateTime(date: Date): string {
    // 将 Date 对象格式化为 ISO 8601 字符串，并调整为 UTC 时间
    return date.toISOString();
  }
  
export function dateTimeReplacer(key: string, value: any): any {
    if (value instanceof Date) {
      // 如果值是 Date 对象，使用自定义的日期时间格式化函数
      return formatDateTime(value);
    }
    // 对于其他类型，不做特殊处理，返回原始值
    return value;
  }
