/*************************************

应用名称：LinearityCurve - 平面设计
下载地址：https://is.gd/dn0RDu
更新日期：2026-02-02
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.linearity\.io\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/LinearityCurve.js
^https?:\/\/.*\.linearity\.io\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/chxm1023/Rewrite/main/LinearityCurve.js

[mitm]
hostname = *.linearity.io

*************************************/


const obj = {};
const ddm = JSON.parse(typeof $response != "undefined" && $response.body || null);

const name = "pro";
const appid = "linearity_curve_pro_yearly_free_trial";

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  obj.headers = $request.headers;
} else if (ddm && ddm.subscriber) {
  ddm.subscriber.subscriptions = ddm.subscriber.subscriptions || {};
  ddm.subscriber.entitlements = ddm.subscriber.entitlements || {};
  const data = {
    "product_identifier": (appid),
    "expires_date" : "2099-09-09T09:09:09Z",
    "purchase_date": "2025-09-09T09:09:09Z"
  };
  ddm.subscriber.entitlements[(name)] = (data);
  ddm.subscriber.subscriptions[(appid)] = {  ...data,	"original_purchase_date": "2025-09-09T09:09:09Z",	"store": "app_store",	"ownership_type": "PURCHASED"};
  obj.body = JSON.stringify(ddm);
  console.log("🥳 已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/ddm1023");
}

$done(obj);
