/*************************************

项目名称：TenPercent
下载地址：https://too.st/71V
更新日期：2023-12-24
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.changecollective\.com\/api\/v\d\/user url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/TenPercent.js

[mitm]
hostname = api.changecollective.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.user = {
    ...chxm1023.user,
    "subscription_period" : "P1Y",
    "created_at" : "2023-09-09T09:09:09Z",
    "expiration_date" : "09/09/2099, 09:09:00 PM UTC",
    "admin" : true,
    "apple_subscription_discount" : null,
    "subscription_in_trial" : true,
    "plan_description" : "1 year (Trial)",
    "completed_trial" : true,
    "subscription_end_date" : "09/09/2099, 09:09:00 PM UTC",
    "subscription_is_auto_renewing" : true,
    "purchaser" : true,
    "subscription_source" : "Apple",
    "app_onboarding_completed_date" : "09/09/2023"
  };

$done({body : JSON.stringify(chxm1023)});