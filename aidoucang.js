/*************************************

应用名称：AI豆仓
脚本功能：高级会员
下载地址：https://apps.apple.com/app/id6760929988
更新日期：2026-08-10
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.aidoucang\.cn\/api\/me url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/aidoucang.js

[mitm]
hostname = api.aidoucang.cn

*************************************/


var ddm = JSON.parse($response.body);

Object.assign(ddm.data, {
  "isVip": true,
  "subscriptionType": "yearly",
  "formalSubscriptionType": "yearly",
  "membershipSource": "formal",
  "subscriptionExpiresAt": "2099-09-09T09:09:09.000Z",
  "formalSubscriptionExpiresAt": "2099-09-09T09:09:09.000Z"
});

// VIP AI 配额
Object.assign(ddm.data.aiQuota, {
  "isVip": true,
  "remaining": ddm.data.aiQuota.limit
});

// VIP 功能开关
Object.assign(ddm.data.featureFlags, {
  "highlight": true,
  "pixelPattern": true,
  "forceCloudHighlight": true,
  "beadBuild": true,
});

// 放开已有功能权限，保留服务端原有结构
Object.keys(ddm.data.featureAccessMap).forEach(function(key) {
  var feature = ddm.data.featureAccessMap[key];

  if (feature && typeof feature === "object") {
    Object.assign(feature, {
      "allowed": true,
    });
  }
});

$done({ body: JSON.stringify(ddm)});