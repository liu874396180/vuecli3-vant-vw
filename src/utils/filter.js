// 过滤金额，保留两位小数
let ToFixed = num =>{
    // return Math.floor(num * 100) / 100;  有bug,当xx.0000 时，return xx
    if(num == null){
      return "0.00";
    }else if(num.indexOf(".") == -1){
      return num;
    }else{
     let indexLength = num.indexOf(".") + 3;
     return num.substr(0,indexLength);
    }

 }

 //将13位时间戳转换xxx-xx-xx日期
let formatDate = timestamp => {
    if (timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        // let h = date.getHours() + ':';
        // let m = date.getMinutes() + ':';
        // let s = date.getSeconds();
        let datess =  Y+M+D;
        return datess;
    }
}
//将13位时间戳转换xxx-xx-xx日期
let formatDateTime = timestamp => {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate()  < 10 ? '0'+date.getDate() : date.getDate() + ' ';
    let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes()< 10 ? '0'+ date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds()< 10 ? '0'+ date.getSeconds() : date.getSeconds())  ;
    let datess =  Y+M+D+" "+h+m+s;
    return datess;
}
// 将系统返回的来的13时间戳计算出距离当前时间的时间间隔，xx分钟前，xx小时前，天，月。。。前
let timeago = (dateTimeStamp) => {
//  if (type == 1) {
//      var stringTime = new Date(Date.parse(dateTimeStamp.replace(/-/g, "/")));
//      dateTimeStamp = stringTime.getTime();
//  }
    // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime(); //获取当前时间毫秒
    var diffValue = now - dateTimeStamp; //时间差
    if (diffValue < 0) {
    	alert("diffValue < 0\n时间戳有误！")
        return;
    }
    var minC = diffValue / minute; //计算时间差的分，时，天，周，月
    var hourC = diffValue / hour;
    var dayC = diffValue / day;
    var weekC = diffValue / week;
    var monthC = diffValue / month;
    var result='';
    if (monthC >= 1) {
        result = "" + parseInt(monthC);
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "月";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "周";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟";
    } else
        result = "刚刚";
    return result;
}
//活动从05-01-01转成01月01
let backTimeForLineYMD = (input) => {
    // var arr = input.split(' ');
    // var arr1 = arr[0]
    // console.log(String(input))
    if (!input) {
      return input;
    }
    var arr = String(input).split("-");
    let str = Number(arr[1]) + "月" + arr[2] + "日";
    return str;
}
//活动从05-01-01转成05:01:01
let backTimeForLinePoint = (input) => {
    if (!input) {
        return input;
    }
    var arr = String(input).split(" ");
    var arr1 = arr[0];
    var arr2 = arr1.split("-");
    let str = arr2.join(".");
    return str;
}
/* 时间-换成. */
let DATATPYEFN = (input) => {
    if (input === "") {
      return "";
    } else {
      return input.replace(/\-/g, ".");
    }
}
//活动从05-01-01转成05/01/01
let backTimeForLineI = (input) => {
    if (!input) {
    return input;
    }
    var arr = String(input).split(" ");
    var arr1 = arr[0];
    var arr2 = arr1.split("-");
    let str = arr2.join("/");
    return str;
}
// 产品详情页中起购金额过滤器，元角分万千万为单位，万和千万保留两位小数，只入不舍
let purchaseAmount = (input) => {
    if (input === "") return input;
    if (!Number(input) && Number(input) !== 0) return input;
    let num = Number(input);
    if (num < 0.1)
      return Math.ceil(num * 100) >= 10
        ? Math.ceil(num * 100) / 10 + "角"
        : Math.ceil(num * 100) + "分";
    if (num < 1)
      return Math.ceil(num * 10) >= 10
        ? Math.ceil(num * 10) / 10 + "元"
        : Math.ceil(num * 10) + "角";
    // 以下为元的判断
    // 1元-999元 只入不舍取整数,添加 元 的单位
    if (num < 1000)
      return Math.ceil(num) >= 1000
        ? money(Math.ceil(num), false)
        : Math.ceil(num) + "元";
    // 1000元-9999元 只入不舍，整数直接显示
    if (num < 10000)
      return Math.ceil(num) >= 10000
        ? money(Math.ceil(num) / 10000, false) + "万"
        : money(Math.ceil(num), false);
    // 以下为万元的判断 大于9999元，只入不舍 添加 万元的单位
    if (num > 9999) return money(Math.ceil(num / 10000), false) + "万";

    // if (num < 10000) return Math.ceil(num) >= 10000 ? money(num / 10000) + '万' : Math.ceil(num) + '元';
    // // 大于 1千万 需要保留两位小数  以下判断需重写
    // if (num >= 10000 && num < 10000000) return Math.ceil(num) >= 10000000 ? money(num / 10000000, true) + '千万' : money(num / 10000, true) + '万';
    // if (num >= 10000000) return money(num / 10000000, true) + '千万';
    // 添加千分位符号
    function money(s, isPoint) {
      if (s == "--") {
        return s;
      }
      if (isPoint) {
        s = s * 100;
        s = Math.ceil(s);
        s = s / 100;
      }
      // 数字转字符串
      s = s + "";

      let point = s.indexOf(".") != -1 ? s.split(".")[1] : "00";
      let r = point.substring(0, 2);
      s = parseFloat(s.replace(/[^\d\.-]/g, "")).toFixed(2) + "";
      let l = s
        .split(".")[0]
        .split("")
        .reverse();
      // r = s.split('.')[1];
      let t = "";
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
      }
      if (isPoint) {
        return (
          t
            .split("")
            .reverse()
            .join("") +
          "." +
          r
        );
      } else {
        return t
          .split("")
          .reverse()
          .join("");
      }
    }
}
/* 理财圈手机号显示中间四位是****  */
let phone_num = (input) => {
    if (input == null || input == "") {
      return "";
    }
    return input.substr(0, 3) + "****" + input.substr(7);
}
/* 排行榜中时间戳换为日期格式  3223727337  =>  2017-11-05  过滤器  */
let MS_to_Date = (input) => {
    let str = new Date(parseInt(input) * 1000).toLocaleString().split(" ")[0];
    let arr = str.split("/");
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (Number(arr[i]) < 10 && Number(arr[i]) <= 19) {
        arr[i] = "0" + arr[i];
      }
      res.push(arr[i]);
    }
    // console.log(res.join('-'));
    return res.join("-");
    // return new Date(parseInt(input) * 1000).toLocaleString().split(' ')[0].replace(/\//g,'-');
}
/* 自定义数字转金额，三位添加逗号，保留两位小数过滤器 */
let moneyFilter = (s) => {
    if (s == "--") {
      return s;
    }
    // 判断数字是正数还是负数
    let minus = false;
    // 数字转字符串
    s = s + "";
    if (s.substring(0, 1) == "-") {
      minus = true;
      s = parseFloat(s.substring(1).replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    } else {
      s = parseFloat(s.replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    }
    let l = s
        .split(".")[0]
        .split("")
        .reverse(),
      r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
    }
    if (minus) {
      return (
        "-" +
        t
          .split("")
          .reverse()
          .join("") +
        "." +
        r
      );
    } else {
      return (
        t
          .split("")
          .reverse()
          .join("") +
        "." +
        r
      );
    }
}
/* 数字转金额，三位添加逗号，不保留小数过滤器 */
let moneyNoLess = (a) => {
    var arr = new Array();
    var xiaoshu = ""; //用来记录参数小数数值包括小数点
    var zhengshu = ""; //用来记录参数录整数数值
    if (a < 1000) {
      //当参数小于1000的时候直接返回参数
      return a;
    } else {
      let t = a.toString(); //将整数转换成字符串
      if (t.indexOf(".") > 0) {
        //如果参数存在小数，则记录小数部分与整数部分
        var index = t.indexOf(".");
        xiaoshu = t.slice(index, t.length);
        zhengshu = t.slice(0, index);
      } else {
        //否则整数部分的值就等于参数的字符类型
        zhengshu = t;
      }
      var num = parseInt(zhengshu.length / 3); //判断需要插入千位分割符的个数

      //将整数1234567890部分拆分为2部分，变量head:1   变量body:123456789
      var head = zhengshu.slice(0, zhengshu.length - num * 3);
      if (head.length > 0) {
        //如果head存在，则在head后面加个千位分隔符，
        head += ",";
      }
      var body = zhengshu.slice(zhengshu.length - num * 3, zhengshu.length);

      //将body字符串123456789转换成一个字符数组arr2 = ['123','456','789']
      var arr2 = new Array();
      for (var i = 0; i < num; i++) {
        arr2.push(body.slice(i * 3, i * 3 + 3));
      }
      body = arr2.join(","); //将数组arr2通过join(',')   方法，拼接成一个以逗号为间隔的字符串

      zhengshu = head + body; //拼接整数部分
      var result = zhengshu + xiaoshu; //最后拼接整数和小数部分
      return result; //返回结果
    }
}
//隐藏手机号18*******90
let hidePhone5 = (phone) => {
    let str = (phone + "").replace(/(\d{2})\d{7}(\d{2})/, "$1*******$2");
    return str;
}
/* 数字保留两位小数过滤器 */
let numberFix2 = () => {
    if (Number(input) === 0) {
        return "0.00";
    }
    if (input == "--") {
        return input;
    }
    let inputStr = input + "";
    let point = inputStr.indexOf(".");
    let result = "";

    if (point == -1) {
        result = Number(inputStr).toFixed(2);
    } else {
        let decimal = inputStr.split(".")[1];
        if (decimal.length >= 2) {
            result = inputStr.split(".")[0] + "." + decimal.substring(0, 2);
        } else {
            result = Number(inputStr).toFixed(2);
        }
    }
    return result;
}
/* 数字保留四位小数过滤器 */
let numberFix4 = () => {
    if (Number(input) === 0) {
        return "0.0000";
    }
    if (input == "--") {
        return input;
    }
    let inputStr = input + "";
    let point = inputStr.indexOf(".");
    let result = "";

    if (point == -1) {
        result = Number(inputStr).toFixed(4);
    } else {
        let decimal = inputStr.split(".")[1];
        if (decimal.length >= 4) {
            result = inputStr.split(".")[0] + "." + decimal.substring(0, 4);
        } else {
            result = Number(inputStr).toFixed(4);
        }
    }
    return result;
}

/**
 * 卡劵 右侧按钮文案  0-立即领取；1-继续领取；2-去使用
 */
let couponsStatus = (val) => {
  let result = "";
  switch (val) {
    case "0":
      result = "立 即 领 取";
      break;
    case "1":
      result = "继 续 领 取";
      break;
    case "2":
      result = "去 使 用";
      break;
    default:
        result = "状 态 有 误";
      break;
  }
  return result;
}
export {
    ToFixed,
    formatDate,
    formatDateTime,
    timeago,
    backTimeForLineYMD,
    backTimeForLinePoint,
    backTimeForLineI,
    DATATPYEFN,
    purchaseAmount,
    phone_num,
    MS_to_Date,
    moneyFilter,
    moneyNoLess,
    hidePhone5,
    numberFix2,
    numberFix4,
    couponsStatus
}




/* 自定义上映时间过滤器 */
// Vue.filter("movieTime", function(input) {
//     return input.substring(2).replace(/-/g, "/");
//   });
//   /* 排行榜创建日期截取年月日过滤器 */
//   Vue.filter("getTimeYMD", function(input) {
//     if (input === "") {
//       return "";
//     } else {
//       return input.split(" ")[0];
//     }
//   });
//   /* 排行榜创建日期 2018-1-12 截取 月日过滤器 */
//   Vue.filter("getTimeMD", function(input) {
//     if (input === "") {
//       return "";
//     } else {
//       let arr = [];
//       arr = input.split("-");
//       return `${arr[1]}-${arr[2]}`;
//     }
//   });
//   /* 理财圈日期过滤器 */
//   Vue.filter("getNewsDate", function(input) {
//     let date = input.split(" ")[0];
//     return (
//       date.substr(0, 4) +
//       "年" +
//       date.substr(5, 2) +
//       "月" +
//       date.substr(8, 2) +
//       "日"
//     );
//   });
//   /* 中奖记录中时分秒截取过滤器 */
//   Vue.filter("getTimeHMS", function(input) {
//     if (input === "") {
//       return "";
//     } else {
//       return input.split(" ")[1];
//     }
//   });
