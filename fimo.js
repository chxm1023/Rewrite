/*************************************

项目功能：Fimo-复古胶片相机 解锁Vip
下载地址：https://t.cn/A6ouHsIk
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：打开App直接恢复购买，不用登录

**************************************

[rewrite_local]
^https:\/\/server\.(yoyiapp|zbisq)\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/fimo.js

[mitm]
hostname = server.*.com

*************************************/


var chxm1023 = JSON.parse($response.body); 
const vipa = '/fimo-user/user';
const vipb = '/fimo-user/apple/certificate';


if ($request.url.indexOf(vipa) != -1){
  chxm1023.films = [
    {
      "goodId" : "fimoAesthetic400",
      "pay" : "sync",
      "goodPrice" : 6,
      "time" : "2022-10-23 13:14:00",
      "tagName" : "",
      "photo" : 0,
      "goodName" : "Aesthetic 400"
    },
    {
      "goodId" : "fimoBusiness400",
      "pay" : "sync",
      "goodPrice" : 0,
      "time" : "2022-10-23 13:14:00",
      "tagName" : "",
      "photo" : 0,
      "goodName" : "Business 400"
    },
    {
      "goodId" : "fimoEK80",
      "pay" : "sync",
      "goodPrice" : 0,
      "time" : "2022-10-23 13:14:00",
      "tagName" : "",
      "photo" : 0,
      "goodName" : "EK 80"
    },
    {
      "goodId" : "fimoIFPAN100",
      "pay" : "sync",
      "goodPrice" : 6,
      "time" : "2022-10-23 13:14:00",
      "tagName" : "",
      "photo" : 2,
      "goodName" : "PAN 100"
    },
    {
      "goodId" : "fimoLMcolor100",
      "pay" : "sync",
      "goodPrice" : 0,
      "time" : "2022-10-23 13:14:00",
      "tagName" : "",
      "photo" : 0,
      "goodName" : "LM Color 100"
    }
  ];
  chxm1023.subscribe = {
    "valid" : true,
    "forever" : 1,
    "endTime" : 4092599349
  };
  chxm1023.filmsCommonOrder = [
    "fimoBlackTea50",
    "fimoDiary400",
    "fimoLMcolor100_w",
    "fimopro_3",
    "fimoUltramax400",
    "fimoTokyo500_w"
  ];
}

if ($request.url.indexOf(vipb) != -1){
  chxm1023= {
  "environment" : "Production",
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1454219307,
    "receipt_creation_date" : "2023-02-06 10:33:36 Etc/GMT",
    "bundle_id" : "com.fimo.camera",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1674881895000",
        "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
        "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "340001110074253",
        "is_trial_period" : "false",
        "original_transaction_id" : "340001053708302",
        "purchase_date" : "2023-01-28 04:58:15 Etc/GMT",
        "product_id" : "fimo.camera.1year",
        "original_purchase_date_pst" : "2022-11-18 18:44:54 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1668825894000",
        "web_order_line_item_id" : "340000483455497",
        "expires_date_ms" : "4092599349000",
        "purchase_date_pst" : "2023-01-27 20:58:15 America/Los_Angeles",
        "original_purchase_date" : "2022-11-19 02:44:54 Etc/GMT"
      },
      {
        "quantity" : "1",
        "purchase_date_ms" : "1668825892000",
        "expires_date" : "2022-11-22 02:44:52 Etc/GMT",
        "expires_date_pst" : "2022-11-21 18:44:52 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "340001053708302",
        "is_trial_period" : "true",
        "original_transaction_id" : "340001053708302",
        "purchase_date" : "2022-11-19 02:44:52 Etc/GMT",
        "product_id" : "fimo.camera.1year2",
        "original_purchase_date_pst" : "2022-11-18 18:44:54 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1668825894000",
        "web_order_line_item_id" : "340000483455496",
        "expires_date_ms" : "1669085092000",
        "purchase_date_pst" : "2022-11-18 18:44:52 America/Los_Angeles",
        "original_purchase_date" : "2022-11-19 02:44:54 Etc/GMT"
      }
    ],
    "download_id" : 501933382449684350,
    "adam_id" : 1454219307,
    "receipt_creation_date_pst" : "2023-02-06 02:33:36 America/Los_Angeles",
    "request_date" : "2023-02-06 11:39:43 Etc/GMT",
    "request_date_pst" : "2023-02-06 03:39:43 America/Los_Angeles",
    "version_external_identifier" : 854559797,
    "request_date_ms" : "1675683583439",
    "original_purchase_date_pst" : "2022-11-18 18:30:17 America/Los_Angeles",
    "application_version" : "1253",
    "original_purchase_date_ms" : "1668825017000",
    "receipt_creation_date_ms" : "1675679616000",
    "original_application_version" : "1245",
    "original_purchase_date" : "2022-11-19 02:30:17 Etc/GMT"
  },
  "status" : 0,
  "latest_receipt" : "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",
  "latest_receipt_info" : [
    {
      "quantity" : "1",
      "purchase_date_ms" : "1674881895000",
      "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
      "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
      "is_in_intro_offer_period" : "false",
      "transaction_id" : "340001110074253",
      "is_trial_period" : "false",
      "original_transaction_id" : "340001053708302",
      "purchase_date" : "2023-01-28 04:58:15 Etc/GMT",
      "product_id" : "fimo.camera.1year",
      "original_purchase_date_pst" : "2022-11-18 18:44:54 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "subscription_group_identifier" : "20919732",
      "original_purchase_date_ms" : "1668825894000",
      "web_order_line_item_id" : "340000483455497",
      "expires_date_ms" : "4092599349000",
      "purchase_date_pst" : "2023-01-27 20:58:15 America/Los_Angeles",
      "original_purchase_date" : "2022-11-19 02:44:54 Etc/GMT"
    },
    {
      "quantity" : "1",
      "purchase_date_ms" : "1668825892000",
      "expires_date" : "2022-11-22 02:44:52 Etc/GMT",
      "expires_date_pst" : "2022-11-21 18:44:52 America/Los_Angeles",
      "is_in_intro_offer_period" : "false",
      "transaction_id" : "340001053708302",
      "is_trial_period" : "true",
      "original_transaction_id" : "340001053708302",
      "purchase_date" : "2022-11-19 02:44:52 Etc/GMT",
      "product_id" : "fimo.camera.1year2",
      "original_purchase_date_pst" : "2022-11-18 18:44:54 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "subscription_group_identifier" : "20919732",
      "original_purchase_date_ms" : "1668825894000",
      "web_order_line_item_id" : "340000483455496",
      "expires_date_ms" : "1669085092000",
      "purchase_date_pst" : "2022-11-18 18:44:52 America/Los_Angeles",
      "original_purchase_date" : "2022-11-19 02:44:54 Etc/GMT"
    }
  ],
  "pending_renewal_info" : [
    {
      "product_id" : "fimo.camera.1year",
      "original_transaction_id" : "340001053708302",
      "auto_renew_product_id" : "fimo.camera.1year2",
      "auto_renew_status" : "1"
    }
  ]
};}

$done({body : JSON.stringify(chxm1023)});
