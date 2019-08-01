import Vue from "vue"
class PublicDialog extends Vue {
    constructor() {
        super();
    }

    // 不是新用户弹窗
    async notNewUserPublicDialog () {
        let data = {};
        let DialogComponent = this.$CommonDialog({
            type: "1",
            appendElement: document.querySelector(".main"),
            className: "",
            title: "您不是新用户哦",
            desc: "不能领取此福利",
            content: require("@src/assets/images/d-c-1.png"),
            btnTxt: "",
            btnDisabled: false,
            linkTxt: "",
            btnCallback: () => {
                this.$Toast(data.linkUrl);
            },
            linkCallback: () => {
                this.$bcBridge.openWebview(data.linkUrl);
            }
        });
        data = await this.$api.getDialogData();
        console.debug("this.$api.getDialogData", data);
        if (this.$utils.isObject(data)) {
            DialogComponent.btnTxt = data.btnTxt;
            DialogComponent.linkTxt = this.$store.state.APP_FLAG === "PMP" ? "" : data.linkTxt;
            DialogComponent.btnDisabled = false;
        } else {
            this.$Toast("this.$api.getDialogData data error")
        }
    }
}
export default new PublicDialog();