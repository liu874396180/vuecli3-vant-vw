import http from '@/apis/http.js'
import config from '@/config/indexApi.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/
// 签到提醒开关
export const B000A122 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "B000A122", REMARK_DATA: "签到页面-提醒", SWITCH: context.switchs });