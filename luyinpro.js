/*************************************

项目名称：录音专业版
下载地址：https://t.cn/A60hA2RH
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/luyinpro.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "status" : 0,
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 492995106,
    "receipt_creation_date" : "2023-06-06 16:06:26 Etc/GMT",
    "bundle_id" : "cn.winat.EasyVoice",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1686065612000",
        "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
        "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "490001314520000",
        "is_trial_period" : "false",
        "original_transaction_id" : "490001314520000",
        "purchase_date" : "2023-06-06 16:06:06 Etc/GMT",
        "product_id" : "com.winat.recording.pro.yearly",
        "original_purchase_date_pst" : "2023-06-06 06:06:07 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1686065613000",
        "web_order_line_item_id" : "490000123456789",
        "expires_date_ms" : "4092599349000",
        "purchase_date_pst" : "2023-06-06 06:06:06 America/Los_Angeles",
        "original_purchase_date" : "2023-06-06 16:06:07 Etc/GMT"
      }
    ],
    "original_purchase_date" : "2023-06-06 16:00:00 Etc/GMT",
    "adam_id" : 492995106,
    "receipt_creation_date_pst" : "2023-06-06 06:06:26 America/Los_Angeles",
    "request_date" : "2023-06-06 16:06:27 Etc/GMT",
    "request_date_pst" : "2023-06-06 06:06:27 America/Los_Angeles",
    "version_external_identifier" : 888888888,
    "request_date_ms" : "1686065635000",
    "original_purchase_date_pst" : "2023-06-06 06:00:00 America/Los_Angeles",
    "application_version" : "11800",
    "original_purchase_date_ms" : "1686065430000",
    "receipt_creation_date_ms" : "1686065634000",
    "original_application_version" : "11800",
    "download_id" : 666666666666666600
  },
  "Author" : "chxm1023",
  "latest_receipt_info" : [
    {
      "quantity" : "1",
      "purchase_date_ms" : "1686065612000",
      "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
      "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
      "is_in_intro_offer_period" : "false",
      "transaction_id" : "490001314520000",
      "is_trial_period" : "false",
      "original_transaction_id" : "490001314520000",
      "purchase_date" : "2023-06-06 16:06:06 Etc/GMT",
      "product_id" : "com.winat.recording.pro.yearly",
      "original_purchase_date_pst" : "2023-06-06 06:06:07 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "original_purchase_date_ms" : "1686065613000",
      "web_order_line_item_id" : "490000123456789",
      "expires_date_ms" : "4092599349000",
      "purchase_date_pst" : "2023-06-06 06:06:06 America/Los_Angeles",
      "original_purchase_date" : "2023-06-06 16:06:07 Etc/GMT"
    }
  ],
  "latest_receipt" : "chxm1023",
  "environment" : "Production",
  "pending_renewal_info" : [
    {
      "product_id" : "com.winat.recording.pro.yearly",
      "original_transaction_id" : "490001314520000",
      "auto_renew_product_id" : "com.winat.recording.pro.yearly",
      "auto_renew_status" : "1"
    }
  ],
  "warning" : "仅供学习，禁止转载或售卖",
  "Telegram" : "https://t.me/chxm1023"
};

$done({body : JSON.stringify(chxm1023)});
