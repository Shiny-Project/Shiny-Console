import request from "services/request";
import { ShinyEventDetail } from "types/dashboard";

/**
 * 获得事件详情
 * @param id
 * @returns
 */
export const fetchEventDetail = (id: number) =>
    request.get<ShinyEventDetail>("/Data/detail", {
        eventId: id,
    });
/**
 * 获得事件图片
 * @param id
 * @returns
 */
export const fetchEventImages = (id: number) =>
    request.get<string[]>("/Data/event_images", {
        eventId: id,
    });
