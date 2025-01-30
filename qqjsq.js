/*************************************

项目名称：亲戚计算器
下载地址：https://t.cn/A63YM7Yq
更新日期：2025-01-30
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
http:\/\/chenghu\.kuaixuanwo\.com\/user\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/qqjsq.js

*************************************/


var ddm = JSON.parse($response.body);

ddm.data = {
  ...ddm.data,
  "subscribe_expires_date" : "2099-09-09 09:09:09",
  "vip_type" : 2,
  "purchase_date" : 1738139336,
  "is_vip" : 1
};

$done({body : JSON.stringify(ddm)});
