/*************************************

项目名称：麦片屏幕翻译
下载地址：https://too.st/9uj
更新日期：2026-10-18
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/youxifanyizhushou\.com\/ios\/api\/product\/user\/remain\/ios url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/mppmfy.js

[mitm]
hostname = youxifanyizhushou.com

*************************************/


var ddm = JSON.parse($response.body);

ddm.data = [{
  "infinite" : true,
  "productPayType": 1,
  "times": 9999,
  "level": 3,
  "desc": "高级订阅",
  "expireTime": "2099-09-09 09:09:09"
}];

$done({ body: JSON.stringify(ddm) });