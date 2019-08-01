import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'

import * as api from "@/apis"
import "@/router/routerController.js"
import config from "@/config/indexApi.js"
import bcBridge from "@/utils/bcBridge.js"
import utils from "@/utils/utils.js"
import 'vant/lib/index.css';


import { Toast,Button ,Loading } from 'vant';
Vue.use(Toast).use(Button).use(Loading);



Vue.prototype["$api"] = api;
Vue.prototype["$Config"] = config;
Vue.prototype["$bcBridge"] = bcBridge;
// Vue.prototype["$utils"] = { ..._, ...utils };
Vue.prototype["$utils"] = { ...utils };
// import * as filters from '@/utils/filter.js'
// Object.keys(filters).forEach(key => {
// 	Vue.filter(key, filters[key])
//   })

import FastClick from 'fastclick';
FastClick.attach(document.body);


Vue.config.productionTip = false;
if (process.env.NODE_ENV !== 'production') {
    let Vconsole = require("vconsole");
    const vConsole = new Vconsole();
    Vue.use(vConsole)
}
//在main.js注入
 
// 1. 注入全部方法
// import hjmvdirective from 'hjm-vue-directive'
// Object.keys(hjmvdirective).forEach(key => {
//   Vue.use(hjmvdirective[key])
// })
//<p>{{msg | formatBank}}</p>
//<p v-swipeleft='swipeleft'>我调用的是左滑动指令</p>
//<p v-swiper='swiper'>我调用的是滑动指令</p>
// 2. 单个方法注入
// import hjmvdirective from 'hjm-vue-directive'
// Vue.use(hjmvdirective.touch).use(hjmvdirective.load)

function bootstrap () {
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
    app.$mount('#app');
}


// app环境
if (bcBridge.APP_FLAG === "PC" || bcBridge.APP_FLAG === "BC") {
    window.loginResult = window.unloginResult = function (argument) {
        const userInfo = JSON.parse(Base64.decode(argument));
        store.commit("USER_LOGIN", userInfo);
        bootstrap();
    }
}
// 非app环境
else {
    bootstrap();
}

