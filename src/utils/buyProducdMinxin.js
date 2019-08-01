export default {


    methods: {

        // 检查用户状态
        checkUserStatus (data) {
            switch (String(data.STATUS)) {
                // 不是新人
                case "4":
                    this.toProducdDetailUrl(this.currClickItem.PRD_INDEX_ID);
                    break;
                // 已体验新手福利
                case "5":
                    this.toProducdDetailUrl(this.currClickItem.PRD_INDEX_ID);
                    break;
                // 已领优惠券
                case "6":
                    this.toProducdDetailUrl(this.currClickItem.PRD_INDEX_ID);
                    break;
                // 未领取优惠券
                case "8":
                    this.openCouponDialogAwait(data);
                    break;

                default:
                    this.$Toast("立即购买-状态异常");
                    break;
            }
        },

        // 未领取现金券
        openCouponDialogAwait (data = {}) {
            let DialogComponentAwait = this.$CommonDialog({
                type: "2",
                appendElement: document.querySelector(".main"),
                className: "",
                title: "您未领取新手专享现金券",
                desc: "抢购不享受满返福利",
                content: `${data.AMOUNT}元现金券`,
                btnTxt: "领取现金券",
                btnDisabled: false,
                btnLoading: false,
                linkTxt: "立即抢购",
                btnCallback: () => {
                    this.getCoupon(data.COUPON_ID, DialogComponentAwait);
                },

                linkCallback: () => {
                    DialogComponentAwait.close();
                    this.toProducdDetailUrl(this.currClickItem.PRD_INDEX_ID);
                }
            });
        },

        /**
         * 领取现金券
         */
        async getCoupon (couponId, DialogComponentAwait) {
            try {
                let data = {};
                let params = { COUPON_ID: couponId };
                DialogComponentAwait.btnLoading = DialogComponentAwait.btnDisabled = true;
                data = await this.$api.postEnjoyCoupon(params);
                console.debug("this.$api.postEnjoyCoupon", data);
                if (this.$utils.isObject(data)) {
                    this.checkCouponStatus(data);
                } else {
                    this.$Toast("this.$api.postEnjoyCoupon data error")
                }
                DialogComponentAwait.btnLoading = DialogComponentAwait.btnDisabled = false;
            } catch (error) {
                console.error(error);
                DialogComponentAwait.btnLoading = DialogComponentAwait.btnDisabled = false;
            }
        },

        // 领取现金券 --- 判断状态
        checkCouponStatus (data) {
            switch (String(data.STATUS)) {
                // 不是新用户
                case "4":
                    this.$NotNewUserPublicDialog();
                    break;
                // 已体验过新人福利
                case "5":
                    this.openCouponDialogTip(data);
                    break;
                // 已领取过优惠券
                case "6":
                    this.openCouponDialogEnd(data);
                    break;
                // 领取成功
                case "7":
                    this.openCouponDialogSuccess(data);
                    break;
                // 其他
                default:
                    this.$Toast("领取现金券-状态异常");
                    break;
            }
        },

        // 领取现金券 --- 已体验过新人福利 产品没有考虑该情况，自行添加该逻辑
        async openCouponDialogTip (data) {
            let DialogComponentTip = this.$CommonDialog({
                type: "2",
                appendElement: document.querySelector(".main"),
                className: "",
                title: "您已使用新手专享现金券",
                desc: "抢购不享受满返福利",
                content: `${data.AMOUNT}元现金券`,
                btnTxt: "立即抢购",
                btnDisabled: false,
                linkTxt: "",
                btnCallback: () => {
                    DialogComponentTip.close();
                    this.toProducdDetailUrl(this.currClickItem.PRD_INDEX_ID);
                },
                linkCallback: () => { }
            });
        },

        // 领取现金券 --- 已领取过现金券弹窗
        async openCouponDialogEnd (data) {
            let DialogComponentEnd = this.$CommonDialog({
                type: "2",
                appendElement: document.querySelector(".main"),
                className: "",
                title: "您已领取新手专享现金券",
                desc: data.LABEL,
                content: `${data.AMOUNT}元现金券`,
                btnTxt: "立即使用",
                btnDisabled: false,
                linkTxt: this.$store.APP_FLAG === "PMP" ? "前往拼财APP-卡券中查看" : "您可在(我的钱包)-卡券中查看",
                btnCallback: () => {
                    DialogComponentEnd.close();
                    this.toProducdDetailUrl(this.currClickItem.PRD_INDEX_ID);
                },
                linkCallback: () => { }
            });
        },

        // 领取现金券 --- 领取成功弹窗
        openCouponDialogSuccess (data = {}) {
            let DialogComponentSuccess = this.$CommonDialog({
                type: "2",
                appendElement: document.querySelector(".main"),
                className: "",
                title: "恭喜获得新人专享现金券",
                desc: data.LABEL,
                content: `${data.AMOUNT}元现金券`,
                btnTxt: "立即使用",
                btnDisabled: false,
                linkTxt: this.$store.APP_FLAG === "PMP" ? "前往拼财APP-卡券中查看" : "您可在(我的钱包)-卡券中查看",
                btnCallback: () => {
                    DialogComponentSuccess.close();
                    this.toProducdDetailUrl(this.currClickItem.PRD_INDEX_ID);
                },
                linkCallback: () => { }
            });
        },

        // 跳转到包装页
        toProducdDetailUrl (producdId) {
            if (!producdId) {
                this.$Toast("产品ID不能为空");
                return;
            }
            const host = this.$Config.producdDetailHost;
            const params = `?type=alone&id=${producdId}&TOKEN=${this.$store.state.TOKEN}`;
            let url = "";
            // 拼财app
            if (this.$store.state.APP_FLAG == "PC") {
                url = (host + `/pc/#/personal?type=alone&id=${producdId}`);
                this.$bcBridge.openWebview(url);
                return;
            }
            // 比财app
            if (this.$store.state.APP_FLAG == "BC") {
                url = (host + `/nay/#/personal?type=alone&id=${producdId}`);
                this.$bcBridge.openWebview(url);
                return;
            }
            // 小程序环境
            if (this.$store.state.APP_FLAG == "PMP") {
                url = (host + `/mp/#/personal?type=alone&id=${producdId}&TOKEN=${this.$store.state.TOKEN}`);
                window.location.href = url;
                return;
            } else {
                this.$Toast("不支持的APP_FLAG");
            }
        }
    }
}