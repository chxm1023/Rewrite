/*************************************

应用名称：绘影字幕
下载地址：https://t.cn/A6oe27Yx
脚本功能：VIP会员
更新日期：2026-08-22
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.bluepulse\.cn\/bluepulse-caption-server-front\/api\/v\d\/\/user\/app-vip-info url script-response-body https://raw.githubusercontent.com/chxm1023/script/main/Rewrite/hyzm.js

[mitm] 
hostname = api.bluepulse.cn

*************************************/


var ddm = JSON.parse($response.body);

Object.assign(ddm.data, {
    "isAppVip" : 1,
    "appVipText" : "您已经是VIP会员",
    "registerTime" : 4092599349000
});

$done({ body: JSON.stringify(ddm) });