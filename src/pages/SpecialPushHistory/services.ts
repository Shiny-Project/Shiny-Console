import request from "services/request";
import { SpecialPushHistoryItem } from "./types";

/**
 * 获得特殊推送触发历史
 * @returns
 */
export const getSpecialPushHistory = () =>
    request.get<SpecialPushHistoryItem[]>("/SpecialPushLog/list");
