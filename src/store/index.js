// 组装模块并导出 store 的文件
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ID: "",                                         // 用户id
        PHONE_NUM: "",                                  // 用户手机号
        TOKEN: "",                                      // 用户登录token
        SESSION_ID: "",                                 // 会话id
        DEVICE_ID: "",                                  // 设备id
        SYSTEM_TYPE: "",                                // 手机类型 ios || android
        VERSION: "",                                    // 设备版本号
        CHANNEL_ID: "",                                 // 渠道ID
        APP_FLAG: "",                                   // PC(拼财) || BC(比财)
        CHANNEL: "",                                    // 未知
        CT_VER: "",                                     // 未知
        MODEL: "",                                      // 未知
    },
    getters: {
        isLogin: state => {
            if (state.TOKEN) return true;
            else return false;
        }
    },

    mutations: {
        ["USER_LOGIN"] (state, userInfo) {
            //用户ID
            state.ID = userInfo.ID || "";
            sessionStorage.setItem("ID", String(userInfo.ID || ""));
            //用户电话
            state.PHONE_NUM = userInfo.PHONE_NUM || "";
            sessionStorage.setItem("PHONE_NUM", String(userInfo.PHONE_NUM || ""));
            //TOKEN
            state.TOKEN = userInfo.TOKEN || "";
            sessionStorage.setItem("TOKEN", String(userInfo.TOKEN || ""));
            //SESSION_ID
            state.SESSION_ID = userInfo.SESSION_ID || "";
            sessionStorage.setItem("SESSION_ID", String(userInfo.SESSION_ID || ""));
            //设备id
            state.DEVICE_ID = userInfo.DEVICE_ID || "";
            sessionStorage.setItem("DEVICE_ID", String(userInfo.DEVICE_ID || ""));
            //手机类型
            state.SYSTEM_TYPE = userInfo.SYSTEM_TYPE || "";
            sessionStorage.setItem("SYSTEM_TYPE", String(userInfo.SYSTEM_TYPE || ""));
            //版本号
            state.VERSION = userInfo.VERSION || "";
            sessionStorage.setItem("VERSION", String(userInfo.VERSION || ""));
            //渠道ID
            state.CHANNEL_ID = userInfo.CHANNEL_ID || "";
            sessionStorage.setItem("CHANNEL_ID", String(userInfo.CHANNEL_ID || ""));
            //应用类型
            state.APP_FLAG = userInfo.APP_FLAG || "";
            sessionStorage.setItem("APP_FLAG", String(userInfo.APP_FLAG || ""));
            // 
            state.CHANNEL = userInfo.CHANNEL || "";
            sessionStorage.setItem("CHANNEL", String(userInfo.CHANNEL || ""));
            // 
            state.CT_VER = userInfo.CT_VER || "";
            sessionStorage.setItem("CT_VER", String(userInfo.CT_VER || ""));
            // 
            state.MODEL = userInfo.MODEL || "";
            sessionStorage.setItem("MODEL", String(userInfo.MODEL || ""));
        }
    },
    modules: {},
    // plugins: [createLogger()]
});