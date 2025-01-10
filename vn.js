/*************************************

项目名称：VN-视频剪辑
下载地址：https://t.cn/A6f4hPxo
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[rewrite_local]

^https:\/\/api2\.vlognow\.me\/vn-pay\/api\/v1\/public\/iap\/receipt\/status?(.*?)*$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/vn.js

[mitm]

hostname = api2.vlognow.me

*************************************/


var chxm1023 = JSON.parse($response.body);

    chxm1023 = {
  "msg" : "success",
  "data" : [
    {
      "origin_transaction_id" : "10086",
      "is_free_trial" : false,
      "active" : true,
      "product_identifier" : "Product_Auto_Renew_Annual_2022_05_13",
      "enanled_auto_renew" : false,
      "is_gift_subscription" : false,
      "platform" : "iOS",
      "billing_date_ms" : 1668673883000,
      "original_purchase_date_ms" : 1668673708000,
      "start_date_ms" : 1668673703000,
      "expires_date_ms" : 4092599350000,
      "status" : 1,
      "group_identifier" : "20936308"
    }
  ],
  "code" : 1
}



$done({body : JSON.stringify(chxm1023)});
