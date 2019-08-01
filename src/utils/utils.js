export default {
    isPc () {
        let userAgentInfo = navigator.userAgent,
            flag = true,
            Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },

    oSnow () {
        var agent = navigator.userAgent.toLowerCase();
        var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
            return "win32";
        }
        if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
            return "win64";

        }
        if (isMac) {
            return "mac";
        }
    },

    /**
     * 获取url字符串参数
     */
    getQueryStr () {
        const url = window.location.href || "";
        let result = {};
        let arr = url.split("?");
        let params = arr[1] && arr[1].split("&");
        if (!params) return result;
        for (let i = 0; i < params.length; i++) {
            let item = params[i].split("=");
            item[0] = decodeURIComponent(item[0]);
            item[1] = decodeURIComponent(item[1]);
            result[item[0]] = item[1];
        }
        return result;
    },

    /**
     * 获取浏览器类型和版本
     */
    userAgent () {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var re = /(msie|firefox|chrome|opera|version|safari).*?([\d.]+)/;
        var m = ua.match(re);
        if (!m) {
            return "其他浏览器";
        }
        Sys.browser = m[1].replace(/version/, "'safari");
        Sys.ver = m[2];
        return Sys;
    },
    /**
     * 图片转base64
     * @param {Str} src url
     * @param {Num} scale 缩放比例
     */
    toBase64 (src, scale = 1) {
        if (!src) return;
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = () => {
                canvas.width = img.width / scale;
                canvas.height = img.height / scale;
                ctx.drawImage(img, 0, 0, img.width / scale, img.height / scale);
                let base64 = canvas.toDataURL("image/png", 0.01);
                resolve(base64);
            }
            img.onerror = (error) => {
                reject(error);
            }
            img.src = src;
        })
    },
    /**
    * 配置节流函数
    * 应用场景:
    * window.onscroll = throttle(testFn, 200);
    * window.onscroll = throttle(testFn, 100, 100);
    * @param  {[Function]}  fn     [要执行的函数]
    * @param  {[Number]}  delay    [延迟执行的毫秒数]
    * @param  {[Number]}  mustRun  [至少多久执行一次]
    * @return {[Function]}         [节流函数]
    */
    throttle (fn, wait, mustRun) {
        let timeout;
        let startTime = new Date();
        return function () {
            let context = this;
            let args = arguments;
            let curTime = new Date();

            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if (curTime - startTime >= mustRun) {
                fn.apply(context, args);
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(fn, wait);
            }
        };
    },

    /**
     * 获取项目url地址 例如：http://xxx.com/path/
     */
    getBaseUrl () {
        let url = window.location.href;
        let item_url;
        if (url.indexOf("?from=") == -1 && url.indexOf("?1=1&from=") == -1) {
            let url_arr = url.split("?");
            item_url = url_arr[0].split("#")[0];
        } else {
            let url_arr = url.split("#");
            item_url = encodeURIComponent(url_arr[0]);
        }
        return item_url;
    },

    /**
     * 设置网页标题
     * @param {Str} title 标题
     */
    setDocumentTitle (title) {
        document.title = title;
        let ua = navigator.userAgent;
        if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
            let i = document.createElement('iframe');
            //i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function () {
                setTimeout(function () {
                    i.remove();
                }, 9);
            };
            document.body.appendChild(i);
        }
    },

    /**
     * 获取当前日期 
     * @return {[Str]} 例如:2019-06-20
     */
    getNowFormatDate () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
}