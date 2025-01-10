/****************************************

项目名称：dB Meter-分贝仪 解锁Pro
下载地址：https://t.cn/A69uZoU8
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️

*****************************************

[rewrite_local]

https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/dbmeterpro.js

[mitm]

hostname = buy.itunes.apple.com

****************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "environment" : "Production",
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1227650795,
    "receipt_creation_date" : "2023-02-01 17:53:00 Etc/GMT",
    "bundle_id" : "com.dbmeterpro.dB-Meter-Free",
    "original_purchase_date" : "2023-02-01 17:47:31 Etc/GMT",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1675273979000",
        "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
        "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "490001278536304",
        "is_trial_period" : "true",
        "original_transaction_id" : "490001278536304",
        "purchase_date" : "2023-02-01 17:52:59 Etc/GMT",
        "product_id" : "com.dbmeterpro.premiumModeSubscriptionWithTrial",
        "original_purchase_date_pst" : "2023-02-01 09:53:00 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1675273980000",
        "web_order_line_item_id" : "490000582557393",
        "expires_date_ms" : "4092599349000",
        "purchase_date_pst" : "2023-02-01 09:52:59 America/Los_Angeles",
        "original_purchase_date" : "2023-02-01 17:53:00 Etc/GMT"
      }
    ],
    "adam_id" : 1227650795,
    "receipt_creation_date_pst" : "2023-02-01 09:53:00 America/Los_Angeles",
    "request_date" : "2023-02-01 17:53:43 Etc/GMT",
    "request_date_pst" : "2023-02-01 09:53:43 America/Los_Angeles",
    "version_external_identifier" : 853883246,
    "request_date_ms" : "1675274023839",
    "original_purchase_date_pst" : "2023-02-01 09:47:31 America/Los_Angeles",
    "application_version" : "301",
    "original_purchase_date_ms" : "1675273651000",
    "receipt_creation_date_ms" : "1675273980000",
    "original_application_version" : "301",
    "download_id" : 502144691720570598
  },
  "pending_renewal_info" : [
    {
      "product_id" : "com.dbmeterpro.premiumModeSubscriptionWithTrial",
      "original_transaction_id" : "490001278536304",
      "auto_renew_product_id" : "com.dbmeterpro.premiumModeSubscriptionWithTrial",
      "auto_renew_status" : "1"
    }
  ],
  "status" : 0,
  "latest_receipt_info" : [
    {
      "quantity" : "1",
      "purchase_date_ms" : "1675273979000",
      "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
      "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
      "is_in_intro_offer_period" : "false",
      "transaction_id" : "490001278536304",
      "app_account_token" : "6F97B5F7-B1C3-411F-9988-FCB22AEDF3B6",
      "is_trial_period" : "true",
      "original_transaction_id" : "490001278536304",
      "purchase_date" : "2023-02-01 17:52:59 Etc/GMT",
      "product_id" : "com.dbmeterpro.premiumModeSubscriptionWithTrial",
      "original_purchase_date_pst" : "2023-02-01 09:53:00 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "subscription_group_identifier" : "20433200",
      "original_purchase_date_ms" : "1675273980000",
      "web_order_line_item_id" : "490000582557393",
      "expires_date_ms" : "4092599349000",
      "purchase_date_pst" : "2023-02-01 09:52:59 America/Los_Angeles",
      "original_purchase_date" : "2023-02-01 17:53:00 Etc/GMT"
    }
  ],
  "latest_receipt" : "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"
};

$done({body : JSON.stringify(chxm1023)});
