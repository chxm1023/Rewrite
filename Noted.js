/*************************************

项目名称：Noted录音笔记软件
下载地址：https://t.cn/A6O07XKv
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/subscription-api\.notedapp\.io\/api\/verifyReceipt url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Noted.js

[mitm] 
hostname = subscription-api.notedapp.io

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "status" : 0,
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1149425482,
    "receipt_creation_date" : "2023-09-09 16:06:26 Etc/GMT",
    "bundle_id" : "com.digitalworkroom.noted",
    "original_purchase_date" : "2023-09-09 16:00:00 Etc/GMT",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1694250549000",
        "transaction_id" : "490001314520000",
        "is_trial_period" : "false",
        "original_transaction_id" : "490001314520000",
        "purchase_date" : "2023-09-09 09:09:09 Etc/GMT",
        "product_id" : "com.digitalworkroom.noted.plus.lifetime",
        "original_purchase_date_pst" : "2023-09-09 02:09:10 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1694250550000",
        "purchase_date_pst" : "2023-09-09 02:09:09 America/Los_Angeles",
        "original_purchase_date" : "2023-09-09 09:09:10 Etc/GMT"
      }
    ],
    "adam_id" : 1149425482,
    "receipt_creation_date_pst" : "2023-09-09 06:06:26 America/Los_Angeles",
    "request_date" : "2023-09-09 16:06:27 Etc/GMT",
    "request_date_pst" : "2023-09-09 06:06:27 America/Los_Angeles",
    "version_external_identifier" : 860342049,
    "request_date_ms" : "1694273635000",
    "original_purchase_date_pst" : "2023-09-09 06:00:00 America/Los_Angeles",
    "application_version" : "742",
    "original_purchase_date_ms" : "1694273430000",
    "receipt_creation_date_ms" : "1694273634000",
    "original_application_version" : "742",
    "download_id" : 502843213225537600
  },
  "latest_receipt_info" : [
    {
      "quantity" : "1",
      "purchase_date_ms" : "1694250549000",
      "transaction_id" : "490001314520000",
      "is_trial_period" : "false",
      "original_transaction_id" : "490001314520000",
      "purchase_date" : "2023-09-09 09:09:09 Etc/GMT",
      "product_id" : "com.digitalworkroom.noted.plus.lifetime",
      "original_purchase_date_pst" : "2023-09-09 02:09:10 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "original_purchase_date_ms" : "1694250550000",
      "purchase_date_pst" : "2023-09-09 02:09:09 America/Los_Angeles",
      "original_purchase_date" : "2023-09-09 09:09:10 Etc/GMT"
    }
  ],
  "latest_receipt" : "chxm1023",
  "environment" : "Production",
  "pending_renewal_info" : [
    {
      "product_id" : "com.digitalworkroom.noted.plus.lifetime",
      "original_transaction_id" : "490001314520000",
      "auto_renew_product_id" : "com.digitalworkroom.noted.plus.lifetime",
      "auto_renew_status" : "1"
    }
  ],
  "warning" : "仅供学习，禁止转载或售卖",
  "Telegram" : "https://t.me/chxm1023"
};

$done({body : JSON.stringify(chxm1023)});
