import request from "services/request";
import { ShinyPushJob } from "types/dashboard";
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
    request.post<ShinyPushJob[]>("/Push/push", {
        channels,
        text,
        account: "shiny",
    });
