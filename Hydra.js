/*************************************

项目名称：Hydra相机
下载地址：https://t.cn/A6OKE5gP
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/creaceed\.com\/apis\/appstore\/verifyreceipt url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Hydra.js

[mitm]
hostname = creaceed.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "environment" : "Production",
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1575702881,
    "receipt_creation_date" : "2023-09-14 13:58:16 Etc/GMT",
    "bundle_id" : "com.creaceed.ihydra2",
    "original_purchase_date" : "2023-09-14 13:14:37 Etc/GMT",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1694699894000",
        "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
        "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "490001482727043",
        "is_trial_period" : "true",
        "original_transaction_id" : "490001482727043",
        "purchase_date" : "2023-09-14 13:58:14 Etc/GMT",
        "product_id" : "com.creaceed.ihydra2.proplan.yearly",
        "original_purchase_date_pst" : "2023-09-14 06:58:15 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1694699895000",
        "web_order_line_item_id" : "490000687585512",
        "expires_date_ms" : "4092599349000",
        "purchase_date_pst" : "2023-09-14 06:58:14 America/Los_Angeles",
        "original_purchase_date" : "2023-09-14 13:58:15 Etc/GMT"
      }
    ],
    "adam_id" : 1575702881,
    "receipt_creation_date_pst" : "2023-09-14 06:58:16 America/Los_Angeles",
    "request_date" : "2023-09-14 13:58:23 Etc/GMT",
    "request_date_pst" : "2023-09-14 06:58:23 America/Los_Angeles",
    "version_external_identifier" : 859703423,
    "request_date_ms" : "1694699903552",
    "original_purchase_date_pst" : "2023-09-14 06:14:37 America/Los_Angeles",
    "application_version" : "2.238.1165",
    "original_purchase_date_ms" : "1694697277000",
    "receipt_creation_date_ms" : "1694699896000",
    "original_application_version" : "2.238.1165",
    "download_id" : 502781166385903937
  },
  "pending_renewal_info" : [
    {
      "product_id" : "com.creaceed.ihydra2.proplan.yearly",
      "original_transaction_id" : "490001482727043",
      "auto_renew_product_id" : "com.creaceed.ihydra2.proplan.yearly",
      "auto_renew_status" : "1"
    }
  ],
  "status" : 0,
  "latest_receipt_info" : [
    {
      "quantity" : "1",
      "purchase_date_ms" : "1694699894000",
      "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
      "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
      "is_in_intro_offer_period" : "false",
      "transaction_id" : "490001482727043",
      "is_trial_period" : "true",
      "original_transaction_id" : "490001482727043",
      "purchase_date" : "2023-09-14 13:58:14 Etc/GMT",
      "product_id" : "com.creaceed.ihydra2.proplan.yearly",
      "original_purchase_date_pst" : "2023-09-14 06:58:15 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "subscription_group_identifier" : "20841834",
      "original_purchase_date_ms" : "1694699895000",
      "web_order_line_item_id" : "490000687585512",
      "expires_date_ms" : "4092599349000",
      "purchase_date_pst" : "2023-09-14 06:58:14 America/Los_Angeles",
      "original_purchase_date" : "2023-09-14 13:58:15 Etc/GMT"
    }
  ],
  "latest_receipt" : "chxm1023"
};

$done({body : JSON.stringify(chxm1023)});
