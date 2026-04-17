/*************************************

应用名称：小倍养基
脚本功能：VIP功能
下载地址：#小程序://小倍养基/9ZYBMQyC3GUAkwg
更新日期：2026-04-17
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/apiv2\.xiaobeiyangji\.com\/api\/app\/user\/to-vip-invitation url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xbyj.js

[mitm]
hostname = apiv2.xiaobeiyangji.com

*************************************/


var ddm = JSON.parse($response.body);

ddm = {
  "isYear" : true,
  "freeMine" : 9999,
  "vipType" : "year",
  "surplus" : {
    "months" : 11,
    "days" : 29,
    "milliseconds" : 999,
    "years" : 99,
    "hours" : 23,
    "seconds" : 59,
    "minutes" : 59
  },
  "isExpire" : false,
  "vipContinuousDays" : 99,
  "vipEndTime" : "2099-09-09 09:09:09"
};

$done({body : JSON.stringify(ddm)});
