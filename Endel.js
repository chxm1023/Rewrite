/*************************************

项目名称：Endel
下载地址：https://t.cn/A60WXk6k
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api-production\.endel\.io\/v\d\/call url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Endel.js

[mitm]
hostname = api-production.endel.io

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.subscription = {
    "promo_type" : "DEFAULT",
    "period" : "YEAR",
    "store_trial" : false,
    "time_left" : 0,
    "price_id" : "12_Months_Instant_Offer",
    "valid_until" : 4092599349,
    "type" : "ACTIVE",
    "trial_type" : "CALENDAR_BASED",
    "prev_store" : "NOSTORE",
    "cancel_at_period_end" : false,
    "multiple_subscriptions" : false,
    "store" : "APP_STORE",
    "trial_canceled" : false
  };

$done({body : JSON.stringify(chxm1023)});
