/*************************************

应用名称：Glass-摄影社区
脚本功能：解锁Patron
下载地址：https://apps.apple.com/app/id1528446339
更新日期：2026-08-27
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/glass\.photo\/api\/v\d\/(account|users\/[^\/?]+$|token|membership) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Glass.js

[mitm]
hostname = glass.photo

*************************************/


var ddm = JSON.parse($response.body);
var target = ddm.user && typeof ddm.user === "object" ? ddm.user : ddm;

Object.assign(target, {
  "visibility": "public",
  "is_member": true,
  "is_patron": true,
  "subscription_type": "test-patron",
  "subscription_provider": "test",
  "subscription_expires_at": "2099-09-09T09:09:09Z",
  "needs_subscription": false
});

if(/membership/.test($request.url)){
  ddm = {
    "provider" : "apple"
  };
}

$done({ body: JSON.stringify(ddm)});