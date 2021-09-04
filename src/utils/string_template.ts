export default function fillStringTemplate(
    string: string,
    keys: Record<string, string | number | string[]>
) {
    let result = string;
    for (const key of Object.keys(keys)) {
        const regExp = new RegExp("\\${" + key + "}", "ig");
        const value = keys[key];
        const valueStr = Array.isArray(value)
            ? JSON.stringify(value)
            : value.toString();
        result = result.replace(regExp, valueStr);
    }
    return result;
}
