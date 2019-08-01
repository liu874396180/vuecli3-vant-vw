import axios from "axios"
// import Toast from '@/components/toast'
import utils from "@/utils/utils.js"
// console.log(Toast)

//全局请求拦截器
axios.interceptors.request.use(function (config) {

    if (config.isLoading) {
        // 显示loading...
    }

    return config;
}, function (error) {
    return Promise.reject(error);
})

//全局响应拦截器
axios.interceptors.response.use(function (response) {
    let config = response.config;

    // 关闭loading...
    //如果HTTP状态码不正常直接return reject错误
    if (!(response.status === 200 || response.status === 201)) {
        // Toast("http statusCode error");
        console.log("http statusCode error");
        return Promise.reject("HTTP状态码：" + response.status + "异常");
    }

    const responseData = response.data;
    if (Object.prototype.toString.call(responseData) !== "[object Object]") {
        console.log("responseData not Object");

        return Promise.reject("responseData not Object");
    }

    // 页面需要responseData全部数据
    if (config.isGetCode) {
        return responseData;
    }

    // 页面只需要responseData.data数据
    if (responseData.head.CODE == "0") {
        return responseData.data || {};
    }

    // 如果不responseData.head.CODE 不是0的情况，提示具体错误信息
    // Toast({
    //     message: `${responseData.head.MSG}`,
    //     iconClass: "icon-tip"
    // });
    // this.$toast(responseData.head.MSG)
    return Promise.reject(responseData.head.MSG);

}, function (error) {
    // 关闭loading...
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = "请求错误";
                break;

            case 401:
                error.message = "未授权，请登录";
                break;

            case 403:
                error.message = "拒绝访问";
                break;

            case 404:
                error.message = "请求错误，未找到该资源";
                break;

            case 408:
                error.message = "请求超时";
                break;

            case 500:
                error.message = "服务器内部错误";
                break;

            case 501:
                error.message = "服务未实现";
                break;

            case 502:
                error.message = "网关错误";
                break;

            case 503:
                error.message = "服务不可用";
                break;

            case 504:
                error.message = "网关超时";
                break;

            case 505:
                error.message = "HTTP版本不受支持";
                break;

            default:
        }
        error.code = error.response.status;

    } else if (error.code == "ECONNABORTED") {
        error.message = '请求超时,请重试';
        // Toast({ message: error.message, iconClass: "icon-tip" });
        return Promise.reject(error.message);

    } else if (error.code == undefined) {
        // error.message = "网络开小差了";
        // Toast({ message: error.message, iconClass: "icon-network" });
        return Promise.reject(error.message);

    } else {
        error.message = "未知错误";
    }

    // router.push(`/error?statusCode=${error.code}&msg=${error.message}`);
    // Toast(error.message);
    return Promise.reject(error.message);
})

export default {

    post: function (baseURL, url, urlType, paramData = {}, paramHead = {}, isLoading = false, isGetCode = false) {
        const param_key = {};
        // 公共域参数
        param_key["head"] = {
            TYPE: urlType,
            TOKEN: sessionStorage.getItem("TOKEN") || "",
            SESSION_ID: sessionStorage.getItem("SESSION_ID") || "",
            DEVICE_ID: sessionStorage.getItem("DEVICE_ID") || "",
            SYSTEM_TYPE: sessionStorage.getItem("SYSTEM_TYPE") || "",
            APP_FLAG: sessionStorage.getItem("APP_FLAG") || "",
            VERSION: sessionStorage.getItem("VERSION") || "",
            ...paramHead
        }
        // 私有域参数
        param_key["param"] = {
            ...paramData
        };
        const data = "param_key=" + JSON.stringify(param_key);
        return axios({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: data,
            timeout: 20000,
            isLoading,
            isGetCode,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
        })
    },

    postPoint: function (baseURL, url, params = {}) {
        const param_key = {};
        // 公共域参数
        param_key["head"] = {
            TYPE: "BATCH_RECORD_FUNCTION_LOG_INFO",
            TOKEN: sessionStorage.getItem("TOKEN") || "",
            SESSION_ID: sessionStorage.getItem("SESSION_ID") || "",
            DEVICE_ID: sessionStorage.getItem("DEVICE_ID") || "",
            SYSTEM_TYPE: sessionStorage.getItem("SYSTEM_TYPE") || "",
            APP_FLAG: sessionStorage.getItem("APP_FLAG") || "",
            VERSION: sessionStorage.getItem("VERSION") || "",
            CHANNEL_ID: sessionStorage.getItem("CHANNEL_ID") || '',
            CHANNEL: sessionStorage.getItem("CHANNEL") || '',
            CT_VER: sessionStorage.getItem("CT_VER") || '',
        };
        // 私有域参数
        param_key["param"] = {
            FUNCTION_LOG_LIST: [{
                ...params,
                APP_PLACE: 98,                                         // 日志位置
                FROM_TYPE: 15,                                         // 日志分类
                NETWORK_TYPE: 2,                                       // 网络类型 1:数据流量  2: WIFI
                SOURCE_ID: 1,                                          // 渠道来源标识
                CREATE_TIME: Date.now(),                               // 创建时间戳，精确到毫秒的时间戳
                SOURCE_URL: encodeURIComponent(window.location.href),  // 链接地址URL 对于H5活动，填当前页URL
                ITEM_VALUE: "",                                        // 记录值
                ITEM_VALUE1: "",                                       // 记录值1 对于H5外部页面：浏览器类型
                ITEM_VALUE2: "",                                       // 记录值
                APP_MARKET_CODE: "h5",                                 //
                MEMBER_ID: sessionStorage.getItem("ID") || "",         // 会员ID 如果已经登录需要传
                FROM_PR1: "",                                          // 附加来源信息
                // FROM_PR2: paramData.MODEL || "",                       // 附加来源信息
            }]
        };
        const data = "param_key=" + JSON.stringify(param_key)
        return axios({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: data,
            timeout: 20000,
            isLoading: false,
            isGetCode: false,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
        })
    },

    get: function (baseURL, url, params, loading, isCode) {
        let isLoading = loading || false;
        let isGetCode = isCode || false;
        return axios({
            method: "GET",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 20000,
            isLoading,
            isGetCode,
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
    }
}
