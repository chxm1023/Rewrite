/*************************************

应用名称：Soar-灵感素材管理工具
下载地址：http://c.u6v.cn/6bx7kh
更新日期：2026-11-09
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.onepiece\.life\/(auth\/apple\/device-session|me\/activity) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Soar.js

[mitm]
hostname = api.onepiece.life

*************************************/


var ddm = JSON.parse($response.body);

ddm.membership = {
  "hasActiveSubscription" : true,
  "updatedAt": new Date().toISOString(),
  "originalTransactionID" : "490003161576863",
  "productID" : "com.onepiece.soar.subscription.lifetime",
  "appleEnvironment" : "Environment(rawValue: \"Production\")",
  "entitlement" : "lifetime",
  "source" : "apple",
  "expirationDate" : null,
  "purchaseDate" : "2026-09-09T09:09:09.000Z",
  "revocationDate" : null,
  "revocationReason" : "",
  "transactionID" : null,
  "lastVerifiedAt" : null,
  "manualGrant" : null,
  "status" : "active"
};

$done({body : JSON.stringify(ddm)});