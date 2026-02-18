/*************************************

项目名称：视氪地图
下载地址：https://t.cn/A61RYcDE
更新日期：2025-03-01
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
http:\/\/39\.101\.171\.199:8080\/(liteKrnaviDownloadUserData|liteKrnaviCheckToken) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/litekrnavi.js

*************************************/


const ddm = JSON.parse($response.body);
const url = $request.url;

const commonData = {
  "service_life": "2099-09-09 09:09:09",
  "is_vip": 1,
  "timestamp": 4092599349
};

if (/liteKrnaviDownloadUserData/.test(url)) {
  Object.assign(ddm.data, commonData, {
    "is_member": true,
    "member_type": 1
  });
} else if (/liteKrnaviCheckToken/.test(url)) {
  Object.assign(ddm.data, commonData);
}

$done({ body: JSON.stringify(ddm) });