export class ValidateError extends Error {}
export const validateValueByType = (value: string, type: string) => {
    if (!value) {
        throw new ValidateError("Value 不能为空");
    }
    if (type === "boolean" && !(value === "true" || value === "false")) {
        throw new ValidateError("Value 只能为 true/false");
    }
    if (type === "integer" && !/^\d+$/.test(value)) {
        throw new ValidateError("Value 只能为整数");
    }
    if (type === "json") {
        try {
            JSON.parse(value);
        } catch (e) {
            throw new ValidateError("Value 不是合法的 JSON");
        }
    }
};
