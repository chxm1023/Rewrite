/*************************************

应用名称：宠日常-科学记录宠物铲屎官的日常
脚本功能：解锁VIP
下载地址：https://is.gd/283uli
更新日期：2026-02-22
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/chongrichang-api-new\.eveningperson\.com\/v\d+\/User\/getUserInfo url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/chongrichang.js

[mitm]
hostname = chongrichang-api-new.eveningperson.com

*************************************/


var ddm = JSON.parse($response.body);

ddm.data.is_vip = 1;
ddm.data.vip_time= 4092599349;

$done({body : JSON.stringify(ddm)});
