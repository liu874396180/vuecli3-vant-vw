

import { Base64 } from 'js-base64'
function setStorage (items) {
    //用户ID
    sessionStorage.setItem("ID", String(items.ID || ""));
    //用户电话
    sessionStorage.setItem("PHONE_NUM", String(items.PHONE_NUM || ""));
    //TOKEN
    sessionStorage.setItem("TOKEN", String(items.TOKEN || ""));
    //SESSION_ID
    sessionStorage.setItem("SESSION_ID", String(items.SESSION_ID || ""));
    //设备id
    sessionStorage.setItem("DEVICE_ID", String(items.DEVICE_ID || ""));
    //手机类型
    sessionStorage.setItem("SYSTEM_TYPE", String(items.SYSTEM_TYPE || ""));
    //版本号
    sessionStorage.setItem("VERSION", String(items.VERSION || ""));
    //渠道ID
    sessionStorage.setItem("CHANNEL_ID", String(items.CHANNEL_ID || ""));
    //应用类型
    sessionStorage.setItem("APP_FLAG", String(items.APP_FLAG || ""));
    // 
    sessionStorage.setItem("CHANNEL", String(items.CHANNEL || ""));
    // 
    sessionStorage.setItem("CT_VER", String(items.CT_VER || ""));
    // 
    sessionStorage.setItem("MODEL", String(items.MODEL || ""));
}

export default {
    // app未登录获取信息
    unlogin (argument) {
        let argumentData = argument ? argument : sessionStorage.getItem("argument");
        let items = JSON.parse(Base64.decode(argumentData));
        console.log("未登陆存登陆信息", items);
        setStorage(items)

        return new Promise((resolve, reject) => {
            window.isLogin = false
            resolve(items)
        })
    },

    // app登陆
    appLogin (argument) {
        let argumentData = argument ? argument : sessionStorage.getItem("argument");
        let items = JSON.parse(Base64.decode(argumentData));
        console.log("app登陆存登陆信息", items);
        setStorage(items)

        return new Promise((resolve, reject) => {
            window.isLogin = true
            resolve(items)
        })
    },

    // PC端模拟登录
    pcLogin (items) {
        console.log("pc登陆存登陆信息", items);
        setStorage(items.head)

        return new Promise((resolve, reject) => {
            window.isLogin = true
            resolve(items)
        })
    },

    // 小程序登录
    pmpLogin (items) {
        console.log("pmp登陆存登陆信息", items);
        setStorage({
            ID: items.MEMBER_ID,
            TOKEN: items.TOKEN,
            SYSTEM_TYPE: "h5",
            APP_FLAG: "PMP",
            MODEL: items.MODEL
        })

        return new Promise((resolve, reject) => {
            window.isLogin = true
            resolve(items)
        })
    }
}