/*************************************

应用名称：起伏-睡眠、冥想与白噪音
下载地址：https://t.cn/A6ouQzMi
更新日期：2026-10-08
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/qifu\.pro\/bapi\/user\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/qifu.js

[mitm]
hostname = qifu.pro

*************************************/


var ddm = JSON.parse($response.body);

Object.assign(ddm.data, {
  "isVip" : true,
  "isLifetimeVip" : true
});

$done({ body: JSON.stringify(ddm) });