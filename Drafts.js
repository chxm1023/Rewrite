/*************************************

项目名称：Drafts
下载地址：https://t.cn/A6OoCm0s
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/backend\.getdrafts\.com\/api\/v\d\/verification\/(account_status|verify_receipt) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Drafts.js

[mitm]
hostname = backend.getdrafts.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "active_expires_at" : "2099-09-09T09:09:09Z",
  "is_subscription_active" : true,
  "active_subscription_type" : "none",
  "is_blocked" : false,
  "has_had_free_trial" : true
};

$done({body : JSON.stringify(chxm1023)});
