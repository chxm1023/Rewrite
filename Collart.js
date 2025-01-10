/*************************************

项目名称：Collart
下载地址：https://t.cn/A6KOxZ9O
项目名称：AI消除笔-擦除物体
下载地址：https://t.cn/A60z9xtt
项目名称：睡前故事大全
下载地址：https://t.cn/A6Uy3Kxo
项目名称：网速测速大师
下载地址：https://t.cn/A6KOx2xo
项目名称：测速管家
下载地址：https://t.cn/A6KOxyCH
项目名称：Pixelance
下载地址：https://t.cn/A6KOxcj9
项目名称：ShotCut plog/拼图/快拍/海报
下载地址：https://t.cn/A60z9lu9
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/iap\.etm\.tech\/receipts url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Collart.js

[mitm]
hostname = iap.etm.tech

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "entitlements" : [
    {
      "redeem" : {

      },
      "expires_date_ms" : 4092599349000,
      "purchase_date_ms" : 1671198216000,
      "product_identifier" : "Collart_Promium_Business_Yearly_Promo_20230612",
      "is_in_intro_offer_period" : false,
      "environment" : "Production",
      "auto_renew" : false,
      "is_in_trial_period" : false,
      "entitlement_id" : "premium"
    }
  ],
  "is_valid" : true
}


$done({body : JSON.stringify(chxm1023)});
