import myAxios from "./axios";
import qs from "qs";

export function getCanvasComps(params) {
    return myAxios({
        url: "/canvasComps",
        method: "get",
        params,
    });
}

export function setCanvasComps(data) {
    return myAxios(
        {
            url: "/canvasComps",
            method: "post",
            data,
        },
        {
            // repeat_request_cancel: false,
            loading: true,
        },
        {
            lock: true,
            text: "获取数据中...",
        }
    );
}
