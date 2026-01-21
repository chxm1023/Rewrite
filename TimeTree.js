/*************************************

项目名称：TimeTree日历
下载地址：https://t.cn/A60Me2oT
更新日期：2026-01-21
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.timetreeapp\.com\/.+\/user\/subscription url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/TimeTree.js

[mitm]
hostname = api.timetreeapp.com

*************************************/


let ddm = {};
try {
  ddm = JSON.parse($response.body || "{}");
} catch (e) {}
const isQX = typeof $task != "undefined";

if (
  ddm.user_subscription &&
  ddm.user_subscription.current_subscription &&
  ddm.user_subscription.current_subscription.status === 1
) {
  console.log("⛔️检测到已存在有效订阅，脚本停止运行！");
  $done({});
}

const data = {
  "status" : 1,
  "subscription_token" : "490001314520000",
  "auto_renewal" : true,
  "cancelled" : false,
  "platform" : 1,
  "platform_status" : "ACTIVE",
  "expire_at" : 4092599349000,
  "plan" : 1,
  "in_trial" : false
};

ddm.user_subscription = ddm.user_subscription || {};
ddm.user_subscription.current_subscription = data;

ddm.user_subscription.trial_used ??= true;
ddm.user_subscription.user_id ??= 66666666;
ddm.user_subscription.uuid ??= "00000000-a001-b002-c003-d00000000004";

if (isQX) { obj = "HTTP/1.1 200 OK";} else {obj = 200;}

$done({status: (obj), headers: $response.headers, body : JSON.stringify(ddm)});