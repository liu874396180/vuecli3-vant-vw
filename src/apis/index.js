import http from '@/apis/http.js'
import config from '@/config/indexApi.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */


/**
 * 公共接口
 *
 */

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false)

// 获取微信分享签名
export const getWxSign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_WEIXIN_SIGN", params, head, false, false)




/**
 *   卡劵 接口
 */

 // 卡劵信息列表
export const k_getCenterData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_MY_MEM_COUPON_NEW_LIST", params, head, false, false)
 // 领取卡劵
 export const k_clickgetkajuan = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_MY_MEM_COUPON_NEW", params, head, false, false)
// 卡劵 规则
export const k_get_coupon_rule = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_COUPON_RULE", params, head, false, false)

export const testGetCode = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEND_SMS", params, head, false, false)