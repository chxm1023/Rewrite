/*************************************

应用名称：LISPOD英语听力分级播客
下载地址：http://c.u6v.cn/5P2ZWc
更新日期：2026-10-24
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.lispod\.cn\/api\/User\/CurrentUser url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/lispod.js

[mitm]
hostname = api.lispod.cn

*************************************/


var ddm = JSON.parse($response.body);

Object.assign(ddm.data, {
  "isLong" : true,
  "isVip" : true,
  "startDate": "2026-10-24 09:09:09",
  "endDate": "2099-09-09 09:09:09"
});

$done({ body: JSON.stringify(ddm) });