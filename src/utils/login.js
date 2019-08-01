import Vue from "vue"
import { Base64 } from 'js-base64'

class Login extends Vue {
    constructor() {
        super();
    }

    login () {
        return new Promise((resolve, reject) => {
            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                this.$bcBridge.goLogin();
                window.loginResult = (argument) => {
                    const userInfo = JSON.parse(Base64.decode(argument));
                    this.$store.commit("USER_LOGIN", userInfo);
                    resolve(userInfo);
                }
                window.loginCanceled = () => {
                    this.$Toast("已取消");
                    reject();
                }
            } else if (this.$store.state.APP_FLAG === "PMP") {
                this.$Toast("请先登录");
            } else {
                this.$iosConfirm({
                    text: "对不起，当前环境暂不支持登录，请下载比财APP领取",
                    input: false,
                    placeholder: '',
                    cancelText: '稍后下载',
                    okText: '去下载',
                    remindDuration: 650,
                    appendChildClass: "",
                }).then((btn) => {
                    window.location.href = this.$Config.appDownloadUrl;
                }).catch(() => { })
            }
        })
    }

    checkLogin (target = {}) {
        const action = target.action;
        const data = target.data;
        if (sessionStorage.getItem("TOKEN") && this.$store.getters.isLogin) {
            action(data);
        } else {
            this.$login().then(() => {
                action(data);
            });
        }
    }
}

export default new Login();
