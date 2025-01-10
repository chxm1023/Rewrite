/*************************************

项目名称：Pandora-管理订阅
下载地址：https://t.cn/A6SijIXp
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[rewrite_local]

https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Pandora.js

[mitm]

hostname = buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);

    chxm1023 = {
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1470560916,
    "receipt_creation_date" : "2022-09-09 13:36:09 Etc/GMT",
    "bundle_id" : "com.ziheng.OneBox",
    "original_purchase_date" : "2022-09-09 11:40:07 Etc/GMT",
    "in_app" : [

    ],
    "adam_id" : 1470560916,
    "receipt_creation_date_pst" : "2022-09-09 06:36:09 America/Los_Angeles",
    "request_date" : "2022-09-09 13:36:46 Etc/GMT",
    "request_date_pst" : "2022-09-09 06:36:46 America/Los_Angeles",
    "version_external_identifier" : 851875912,
    "request_date_ms" : "1662730606390",
    "original_purchase_date_pst" : "2022-09-09 04:40:07 America/Los_Angeles",
    "application_version" : "31",
    "original_purchase_date_ms" : "1662723607000",
    "receipt_creation_date_ms" : "1662730569000",
    "original_application_version" : "8",
    "download_id" : 501733452868313600
  },
  "status" : 0,
  "environment" : "Production"
}

$done({body : JSON.stringify(chxm1023)});
