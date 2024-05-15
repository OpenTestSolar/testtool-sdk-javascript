function customDateSerializer(value: Date): string {
    // 自定义日期格式，例如 YYYY-MM-DD
    return value.toISOString()
}

export function typedSerialize<T>(data: T): string {
    return JSON.stringify(data, (_, val) => {
        if (val instanceof Date) {
            // 仅针对 Date 类型进行自定义序列化
            return customDateSerializer(val);
        }
        // 对于其他类型，使用默认序列化
        return val;
    }, 2); // 缩进 2 空格美化输出
}

