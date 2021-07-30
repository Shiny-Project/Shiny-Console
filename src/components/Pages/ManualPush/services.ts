import request from "services/request";
/**
 * 获得可用推送渠道
 * @returns 
 */
export const fetchAvailableChannels = () =>
    request.get<string[]>("/Push/channels");
/**
 * 手动推送
 * @param channels 推送渠道
 * @param text 推送内容
 * @returns 
 */
export const manualPush = (channels: string[], text: string) =>
    request.post("/Push/push", {
        channels,
        text,
        account: "shiny",
    });
