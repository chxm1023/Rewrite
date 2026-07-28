/*************************************

应用名称：超级制图
脚本功能：会员功能
下载地址：https://shm.to/cjzt
更新日期：2026-07-28
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/cn\.iflypix\.com\/api\/user\/user\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/chaojizhitu.js

[mitm]
hostname = cn.iflypix.com

*************************************/


var ddm = JSON.parse($response.body);

if (/user\/info/.test($request.url)) {
  Object.assign(ddm.data, {
    "vipEndTime": 4092599349000,
    "hasRenewal": true,
    "accountLevel": 1,
    "points": 300,
    "renewalTypes": [
      "year"
    ]
  });
  ddm.data.storageUsage.limitBytes = 10000000000;
}

$done({ body: JSON.stringify(ddm) });