/*************************************

项目名称：题材库
脚本功能：解锁会员
下载地址：#小程序://题材库/7lJ9vMf43M3tnZd
更新日期：2025-05-19
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/app\.txcfgl\.com\/api\/app\/user$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/ticaiku.js

[mitm]
hostname = app.txcfgl.com

*************************************/


var ddm = JSON.parse($response.body);
const expireAt = "2099-09-09 09:09:09";

function calculateDaysToEnd(expireDate) {
  const expire = new Date(expireDate.replace(" ", "T"));
  const today = new Date();
  const diffTime = expire - today;
  return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
}

const daysLeft = calculateDaysToEnd(expireAt);

Object.assign(ddm.data, {
    "vipTime" : expireAt,
    "hasPaidSvip" : 1,
    "ssvip" : {
      "isVip" : true,
      "vipExpiringDays" : daysLeft,
      "isPaidVip" : true,
      "isTempVip" : false
    },
    "vipType" : "SVIP会员",
    "vipNotifyStatus" : 1,
    "pureSvipTime" : expireAt,
    "svip" : {
      "isVip" : true,
      "vipExpiringDays" : daysLeft,
      "isPaidVip" : true,
      "isTempVip" : false
    },
    "svipTime" : expireAt,
    "svipType" : 1,
    "ssvipTime" : expireAt,
    "trainingCampVip" : {
      "isVip" : true,
      "vipExpiringDays" : daysLeft,
      "isPaidVip" : true,
      "isTempVip" : false
    },
    "vip" : {
      "isVip" : true,
      "vipExpiringDays" : daysLeft,
      "isPaidVip" : true,
      "isTempVip" : false
    }
});

$done({ body: JSON.stringify(ddm) });