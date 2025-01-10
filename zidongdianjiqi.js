/****************************************

项目名称：自动点击器-Auto Clicker
下载工具：https://t.cn/A6NIJZK9
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

*****************************************

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zidongdianjiqi.js

[mitm]
hostname = api.revenuecat.com

****************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "request_date_ms" : 1681814039434,
  "request_date" : "2023-04-18T10:33:59Z",
  "subscriber" : {
    "non_subscriptions" : {
      "easyclicker.premium.discount2" : [
        {
          "id" : "86b55bfa0e",
          "is_sandbox" : false,
          "purchase_date" : "2023-04-18T10:33:24Z",
          "original_purchase_date" : "2023-04-18T10:33:24Z",
          "store" : "app_store"
        }
      ]
    },
    "first_seen" : "2023-04-18T10:32:29Z",
    "original_application_version" : "148",
    "entitlement" : {

    },
    "other_purchases" : {
      "easyclicker.premium.discount2" : {
        "purchase_date" : "2023-04-18T10:33:24Z"
      }
    },
    "management_url" : null,
    "subscriptions" : {

    },
    "entitlements" : {
      "pro" : {
        "grace_period_expires_date" : null,
        "purchase_date" : "2023-04-18T10:33:24Z",
        "product_identifier" : "easyclicker.premium.discount2",
        "expires_date" : null
      }
    },
    "original_purchase_date" : "2023-04-18T10:32:14Z",
    "original_app_user_id" : "$RCAnonymousID:d145945656a94b7c91db7cf9332e105a",
    "last_seen" : "2023-04-18T10:32:29Z"
  }
};

$done({body : JSON.stringify(chxm1023)});
