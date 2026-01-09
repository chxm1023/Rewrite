/*************************************

应用名称：问真八字
脚本功能：解锁VIP
下载地址：https://is.gd/ePYLZd
更新日期：2026-01-09
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/bzpp3\.iwzbz\.com\/api\/.+\/user\/getvipinfo url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/wenzhenbazi.js

[mitm]
hostname = bzpp3.iwzbz.com

*************************************/


var ddm = JSON.parse($response.body);

ddm.data.expires = "2099-09-09 09:09:09";
ddm.data.vipLevel = 3;
ddm.isSuccess = true;

$done({ body: JSON.stringify(ddm) });