/*************************************

应用名称：系统电池分析
下载地址：http://c.u6v.cn/6xpzfY
更新日期：2026-09-17
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/apis\.zhangthree\.cn\/vip\/storekit\/purchases\/sync url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xtdcfx.js

[mitm]
hostname = apis.zhangthree.cn

*************************************/


var ddm = JSON.parse($response.body);

Object.assign(ddm.data, {
  "member": true,
  "adFree": true,
  "entitlementStatus": "ACTIVE",
  "risk": "LOW",
  "action": "ALLOW",
  "serverVerifiedUntil": "2099-09-09T09:09:09Z",
  "vip": true,
  "expiresAt": "2099-09-09T09:09:09Z",
  "privileges": [
    "member",
    "vip",
    "ad_free"
  ],
  "offlineGraceUntil": "2099-09-09T09:09:09Z",
  "signedEntitlementToken": "TEST_SIGNED_ENTITLEMENT_TOKEN"
});

$done({ body: JSON.stringify(ddm) });