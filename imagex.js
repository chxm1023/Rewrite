/****************************************

项目名称：Imagex-AI图片放大改善图片画质
下载工具：https://t.cn/A6NI6KJY
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

*****************************************

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/imagex.js

[mitm]
hostname = api.revenuecat.com

****************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "request_date_ms" : 1681831596118,
  "request_date" : "2023-04-18T15:26:36Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2023-04-18T15:24:37Z",
    "original_application_version" : "24",
    "entitlement" : {

    },
    "other_purchases" : {

    },
    "management_url" : "https://apps.apple.com/account/subscriptions",
    "subscriptions" : {
      "imagex.pro.ios.lifetime" : {
        "warning" : "仅供学习，禁止转载或售卖",
        "wechat" : "chxm1023",
        "purchase_date" : "2022-09-09T09:09:09Z",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "ownership_type" : "PURCHASED"
      }
    },
    "entitlements" : {
      "imagex.pro.ios" : {
        "warning" : "仅供学习，禁止转载或售卖",
        "wechat" : "chxm1023",
        "purchase_date" : "2022-09-09T09:09:09Z",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "ownership_type" : "PURCHASED",
        "product_identifier" : "imagex.pro.ios.lifetime"
      }
    },
    "original_purchase_date" : "2023-04-18T12:43:31Z",
    "original_app_user_id" : "$RCAnonymousID:503553d9274d4de7bbac3d9e2eebdcf1",
    "last_seen" : "2023-04-18T15:24:37Z"
  }
};

$done({body : JSON.stringify(chxm1023)});
