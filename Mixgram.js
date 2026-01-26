/*************************************

应用名称：Mixgram-图片拼接
脚本功能：解锁高级版
下载地址：https://is.gd/7m6Awj
更新日期：2026-01-26
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.+\.cloudfunctions\.net\/validateSubscription url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Mixgram.js
^https?:\/\/.+\.appsflyersdk\.com\/api\/v\d\/ios\/validate_subscription url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Mixgram.js

[mitm]
hostname = *.cloudfunctions.net, *.appsflyersdk.com

*************************************/


var ddm = JSON.parse($response.body);

if(/validateSubscription/.test($request.url)){
  ddm = {
    ...ddm,
    "purchased_product" : "mixgram.weekly.with.trial.regional",
    "is_in_intro_offer_period" : true,
    "receipt_status" : 0,
    "expires_date_ms" : "2099-09-09T09:09:09.000Z",
    "original_purchase_date_ms" : "2026-01-22T18:43:34.000Z",
    "is_trial_period" : true,
    "subscription_status" : "Active",
    "is_subcribed" : true,
    "free_trial_start_date" : 1769107412000,
    "had_intro_offer" : true
  };
}

if(/validate_subscription/.test($request.url)){
  ddm= {
    "mixgram.weekly.with.trial.regional" : {
      "result" : true,
      "receipt_data" : {
        "product_id" : "mixgram.weekly.with.trial.regional",
        "quantity" : "1",
        "transaction_id" : "490002645478744",
        "purchase_date_ms" : "1769107412000",
        "original_purchase_date_pst" : "2026-01-22 10:43:34 America/Los_Angeles",
        "purchase_date_pst" : "2026-01-22 10:43:32 America/Los_Angeles",
        "original_purchase_date_ms" : "1769107414000",
        "is_trial_period" : "true",
        "original_purchase_date" : "2026-01-22 18:43:34 Etc/GMT",
        "original_transaction_id" : "490002645478744",
        "purchase_date" : "2026-01-22 18:43:32 Etc/GMT"
      }
    }
  };
}

$done({body : JSON.stringify(ddm)});