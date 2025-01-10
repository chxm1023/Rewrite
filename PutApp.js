/*************************************

项目名称：PutApp-应用收集
下载地址：https://t.cn/A6pFrrY7
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/PutApp.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1456379965,
    "receipt_creation_date" : "2023-07-06 16:08:28 Etc/GMT",
    "bundle_id" : "com.maliquankai.appdesign",
    "original_purchase_date" : "2021-07-11 13:15:28 Etc/GMT",
    "in_app" : [

    ],
    "adam_id" : 1456379965,
    "receipt_creation_date_pst" : "2023-07-06 09:08:28 America/Los_Angeles",
    "request_date" : "2023-07-06 16:12:42 Etc/GMT",
    "request_date_pst" : "2023-07-06 09:12:42 America/Los_Angeles",
    "version_external_identifier" : 855402637,
    "request_date_ms" : "1688659962340",
    "original_purchase_date_pst" : "2021-07-11 06:15:28 America/Los_Angeles",
    "application_version" : "53",
    "original_purchase_date_ms" : "1626009328000",
    "receipt_creation_date_ms" : "1688659708000",
    "original_application_version" : "1.5.8",
    "download_id" : 84081130808013
  },
  "status" : 0,
  "environment" : "Production"
};

$done({body : JSON.stringify(chxm1023)});
