/*************************************

应用名称：慢慢变富
脚本功能：解锁VIP
下载地址：https://is.gd/Z14wk9
更新日期：2025-12-31
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.luyaolab\.cn\/api\/investment\/user\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/mmbf.js

[mitm]
hostname = www.luyaolab.cn

*************************************/


var ddm = JSON.parse($response.body);

Object.assign(ddm.data, {
    "vipExpiration" : "2099-09-09 09:09:09",
    "registrationDate" : "2025-12-31 17:58:38",
    "membershipType" : "Trial"
});

$done({ body: JSON.stringify(ddm) });