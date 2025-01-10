/*************************************

项目名称：DayMore-时尚日记本
下载地址：https://t.cn/A6OKkFsC
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.execute-api\.ap-northeast-2\.amazonaws\.com\/product\/apple\/receipt url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/daymore.js

[mitm]
hostname = *.execute-api.ap-northeast-2.amazonaws.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "status" : 0,
  "iap_response" : {
    "status" : 0,
    "environment" : "Production",
    "receipt" : {
      "receipt_type" : "Production",
      "app_item_id" : "1457149632",
      "in_app" : [
        {
          "quantity" : "1",
          "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
          "promotional_offer_id" : "",
          "is_in_intro_offer_period" : "false",
          "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
          "transaction_id" : "490001482142284",
          "purchase_date_ms" : "1694643711000",
          "is_trial_period" : "true",
          "original_transaction_id" : "490001482142284",
          "purchase_date" : "2023-09-13 22:21:51 Etc/GMT",
          "product_id" : "com.daymore.premium.year",
          "subscription_group_identifier" : "",
          "original_purchase_date_pst" : "2023-09-13 15:21:51 America/Los_Angeles",
          "web_order_line_item_id" : "490000687264460",
          "original_purchase_date_ms" : "1694643711000",
          "expires_date_ms" : "4092599349000",
          "purchase_date_pst" : "2023-09-13 15:21:51 America/Los_Angeles",
          "original_purchase_date" : "2023-09-13 22:21:51 Etc/GMT"
        }
      ],
      "bundle_id" : "com.tokque.DayMore",
      "receipt_creation_date" : "2023-09-13 22:22:00 Etc/GMT",
      "original_purchase_date" : "2023-09-13 22:17:38 Etc/GMT",
      "adam_id" : 1457149632,
      "receipt_creation_date_pst" : "2023-09-13 15:22:00 America/Los_Angeles",
      "request_date" : "2023-09-13 22:22:01 Etc/GMT",
      "request_date_pst" : "2023-09-13 15:22:01 America/Los_Angeles",
      "version_external_identifier" : "854767416",
      "request_date_ms" : "1694643721295",
      "original_purchase_date_pst" : "2023-09-13 15:17:38 America/Los_Angeles",
      "application_version" : "129",
      "original_application_version" : "129",
      "receipt_creation_date_ms" : "1694643720000",
      "original_purchase_date_ms" : "1694643458000",
      "download_id" : 502779402524572433
    },
    "pending_renewal_info" : [
      {
        "expiration_intent" : "",
        "product_id" : "com.daymore.premium.year",
        "price_consent_status" : "",
        "auto_renew_status" : "1",
        "auto_renew_product_id" : "com.daymore.premium.year",
        "is_in_billing_retry_period" : "",
        "original_transaction_id" : "490001482142284"
      }
    ],
    "latest_receipt_info" : [
      {
        "quantity" : "1",
        "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
        "promotional_offer_id" : "",
        "is_in_intro_offer_period" : "false",
        "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
        "transaction_id" : "490001482142284",
        "purchase_date_ms" : "1694643711000",
        "is_trial_period" : "true",
        "original_transaction_id" : "490001482142284",
        "purchase_date" : "2023-09-13 22:21:51 Etc/GMT",
        "product_id" : "com.daymore.premium.year",
        "subscription_group_identifier" : "20837035",
        "original_purchase_date_pst" : "2023-09-13 15:21:51 America/Los_Angeles",
        "web_order_line_item_id" : "490000687264460",
        "original_purchase_date_ms" : "1694643711000",
        "expires_date_ms" : "4092599349000",
        "purchase_date_pst" : "2023-09-13 15:21:51 America/Los_Angeles",
        "original_purchase_date" : "2023-09-13 22:21:51 Etc/GMT"
      }
    ],
    "latest_receipt" : "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"
  },
  "result" : 1
};

$done({body : JSON.stringify(chxm1023)});
