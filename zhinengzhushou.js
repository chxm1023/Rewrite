/*************************************

项目名称：智能助手
下载地址：https://t.cn/A6lVgFg6
版本支持：1.0.3
更新日期：2023-12-14
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/(www\.kaolahome\.com\/xunnews|cat-revenuecat-qscqkotbrh\.cn-hongkong\.fcapp\.run)\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zhinengzhushou.js
^https?:\/\/(www\.kaolahome\.com\/xunnews|cat-revenuecat-qscqkotbrh\.cn-hongkong\.fcapp\.run)\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/chxm1023/Rewrite/main/zhinengzhushou.js

[mitm]
hostname = www.kaolahome.com, cat-revenuecat-qscqkotbrh.cn-hongkong.fcapp.run

*************************************/


const chxm1023 = {};
const chxm1024 = JSON.parse(typeof $response != "undefined" && $response.body || null);

const name = "vip";
const appid = "sageapp_777_1y";

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  chxm1023.headers = $request.headers;
} else if (chxm1024 && chxm1024.subscriber) {
  chxm1024.subscriber.subscriptions = chxm1024.subscriber.subscriptions || {};
  chxm1024.subscriber.entitlements = chxm1024.subscriber.entitlements || {};
  const data = {
	"product_identifier": (appid),
	"expires_date": "2099-09-09T09:09:09Z",
	"purchase_date": "2022-09-09T09:09:09Z"
	};
  chxm1024.subscriber.entitlements[(name)] = (data);
  chxm1024.subscriber.subscriptions[(appid)] = {  ...data,	"Author": "chxm1023",	"Telegram": "https://t.me/chxm1023",	"warning": "仅供学习，禁止转载或售卖",	"original_purchase_date": "2022-09-09T09:09:09Z",	"store": "app_store",	"ownership_type": "PURCHASED"};
  chxm1023.body = JSON.stringify(chxm1024);
}

$done(chxm1023);
