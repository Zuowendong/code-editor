import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";

/**
 * 取消重复请求
 */
const pendingMap = new Map();

/**
 * 生成每个请求的唯一 Map键
 * @param {请求配置} config
 * @returns
 */
function getPendingKey(config) {
    let { url, method, params, data } = config;
    if (typeof data === "string") {
        data = JSON.parse(data);
    } // response里返回的config.data是个字符串
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join(
        "&"
    );
}

/**
 * 存储每个请求唯一值，也就是cancel() 用于取消请求
 * @param {请求配置} config
 */
function addPending(config) {
    const pendingKey = getPendingKey(config);
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
            if (!pendingMap.has(pendingKey)) {
                pendingMap.set(pendingKey, cancel);
            }
        });
}

/**
 * 删除重复的请求
 * @param {请求配置} config
 */
function removePending(config) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey);
        cancelToken(pendingKey);
        pendingMap.delete(pendingKey); // 取消请求之后也要从map中删除
    }
}

// ---------------------------------------------------------------------------------

/**
 * loading
 * 同一时间内发起多个请求，我们只需要展示一个Loading层即可，不需要产生多个造成重复展示
 * 同一时间内发起多个请求展示的Loading层以最后一个请求响应而关闭销毁
 */
const LoadingInstance = {
    _target: null, // 保存loading实例
    _count: 0,
};

function closeLoading(_options) {
    if (_options.loading && LoadingInstance._count > 0)
        LoadingInstance._count--;
    if (LoadingInstance._count === 0) {
        LoadingInstance._target.close();
        LoadingInstance._target = null;
    }
}

// ---------------------------------------------------------------------------------

/**
 * 异常处理
 */
function httpErrorStatusHandle(error) {
    console.log("error", error);
    console.log("error.message: ", error.message);
    console.log("error.response: ", error.response);

    if (axios.isCancel(error)) {
        return console.error("repeat request: " + error.message);
    }

    let message = "";
    if (error && error.response) {
        switch (error.response.status) {
            case 302:
                message = "接口重定向了";
                break;
            case 400:
                message = "参数错误";
                break;
            case 401:
                message = "您未登录或登录超时，请先登录";
                break;
            case 403:
                message = "您没有操作权限";
                break;
            case 404:
                message = `请求地址错误：${error.response.config.url}`;
                break;
            case 408:
                message = "请求超时";
                break;
            case 409:
                message = "系统已存在相同数据";
                break;
            case 500:
                message = "服务器内部错误";
                break;
            case 501:
                message = "服务未实现";
                break;
            case 502:
                message = "网关错误";
                break;
            case 503:
                message = "服务不可用";
                break;
            case 504:
                message = "服务暂时不可用，请稍后再试";
                break;
            case 505:
                message = "HTTP版本不支持";
                break;

            default:
                message = "异常错误，请联系管理员";
                break;
        }
    }
    if (error.message.includes("timeout")) {
        message = "网络请求超时";
    }
    if (error.message.includes("Network")) {
        message = window.navigator.onLine ? "服务端异常" : "您断网了";
    }

    console.error(message);
    ElMessage.error(message);
}

// ---------------------------------------------------------------------------------

/**
 * 自动携带token
 */
function getToken() {
    return localStorage.getItem("token");
}

// ---------------------------------------------------------------------------------

/**
 * axios 二次封装
 * @param {axios基本配置} axiosConfig
 * @param {自定义配置} customOptions
 * @returns
 */
export default function myAxios(axiosConfig, customOptions, loadingOptions) {
    const service = axios.create({
        baseURL: "http://127.0.0.1:7001/api",
        timeout: 10000,
    });

    /**
     * 自定义配置
     * 1. 是否开启取消重复请求
     * 2. 是否开启loading层效果
     * 3. 是否开启口错误信息提示
     */
    let custom_options = Object.assign(
        {
            repeat_request_cancel: true, // 默认开启取消重复请求
            loading: false, // 默认关闭loading层效果
            error_message_show: true, // 默认开启接口错误信息提示
        },
        customOptions
    );

    // 添加request拦截器
    service.interceptors.request.use(
        (config) => {
            removePending(config);
            custom_options.repeat_request_cancel && addPending(config);

            // 创建loading实例
            if (custom_options.loading) {
                LoadingInstance._count++;
                if (LoadingInstance._count === 1) {
                    LoadingInstance._target = ElLoading.service(loadingOptions);
                }
            }

            // 自动携带token
            if (getToken() && typeof window !== "undefined") {
                config.headers.Authorization = getToken();
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // 添加response拦截器
    service.interceptors.response.use(
        (response) => {
            removePending(response.config);
            custom_options.loading && closeLoading(custom_options); // 关闭 loading
            return response;
        },
        (error) => {
            error.config && removePending(error.config);
            custom_options.loading && closeLoading(custom_options);

            custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
            return Promise.reject(error);
        }
    );

    return service(axiosConfig);
}
