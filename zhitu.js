/*************************************

项目名称：Lens智图-画质增强&二次元AI作画
下载地址：https://t.cn/A6NIfo7O
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(\$RCAnonymousID%)?(.*?)*$) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zhitu.js

[mitm] 
hostname = api.revenuecat.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "request_date_ms" : 1681823991752,
  "request_date" : "2023-04-18T13:19:51Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2023-04-18T12:44:26Z",
    "original_application_version" : "117",
    "entitlement" : {

    },
    "other_purchases" : {

    },
    "management_url" : null,
    "subscriptions" : {
      "yearly_sub_pro" : {
        "warning" : "仅供学习，禁止转载或售卖",
        "wechat" : "chxm1023",
        "purchase_date" : "2022-09-09T09:09:09Z",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "ownership_type" : "PURCHASED",
        "expires_date" : "2099-09-09T09:09:09Z"
      }
    },
    "entitlements" : {
      "pro" : {
        "wechat" : "chxm1023",
        "ownership_type" : "PURCHASED",
        "product_identifier" : "yearly_sub_pro",
        "expires_date" : "2099-09-09T09:09:09Z",
        "warning" : "仅供学习，禁止转载或售卖",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "purchase_date" : "2022-09-09T09:09:09Z"
      }
    },
    "original_purchase_date" : "2023-04-18T11:15:42Z",
    "original_app_user_id" : "$RCAnonymousID:7ec6e5afc204463d9a7a25718bddc1f8",
    "last_seen" : "2023-04-18T13:19:18Z"
  }
};

$done({body : JSON.stringify(chxm1023)});
