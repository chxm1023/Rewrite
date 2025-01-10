/*************************************

项目名称：MIX-滤镜大师
下载地址：https://t.cn/A6WbVOQJ
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/cdn-bm\.camera360\.com\/api\/(mix\/(getinfo|purchase|recovery)|iap\/check-receipt) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/mix.js

[mitm]
hostname = cdn-bm.camera360.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const vip = '/mix/getinfo';
const sj = '/mix/purchase';
const hf = '/mix/recovery';
const iap = '/iap/check-receipt';
const purchase = {"errorCode":0,"orderList":[{"quantity":"1","product_id":"com.vstudio.MIX.subscription.auto.year.88","transaction_id":"490001516171224","original_transaction_id":"490001516171224","purchase_date":"2023-10-19 07:16:08 Etc/GMT","purchase_date_ms":"1697699768000","purchase_date_pst":"2023-10-19 00:16:08 America/Los_Angeles","original_purchase_date":"2023-10-19 07:16:08 Etc/GMT","original_purchase_date_ms":"1697699768000","original_purchase_date_pst":"2023-10-19 00:16:08 America/Los_Angeles","expires_date":"2099-09-09 09:09:09 Etc/GMT","expires_date_ms":"4092599349000","expires_date_pst":"2099-09-09 06:06:06 America/Los_Angeles","web_order_line_item_id":"490000704929786","is_trial_period":"true","is_in_intro_offer_period":"false","in_app_ownership_type":"PURCHASED"}],"autoBindingUserId":"","pendingRenewalInfo":[{"auto_renew_product_id":"com.vstudio.MIX.subscription.auto.year.88","product_id":"com.vstudio.MIX.subscription.auto.year.88","original_transaction_id":"490001516171224","auto_renew_status":"0"}]};

if ($request.url.indexOf(vip) != -1){
  chxm1023.data = {
    "autoStatus" : 1,
    "autoMobileMMType" : 2,
    "expires" : 0,
    "autoType" : 0,
    "autoMobileMMStatus" : 1,
    "autoMobileMMExpires" : 4092599349,
    "serverTime" : 1697699768,
    "isMiguVip" : 2,
    "autoState" : 1,
    "autoExpires" : 0,
    "autoBindingTransactionIds" : [

    ],
    "status" : 2
  };
}

if ($request.url.indexOf(sj) != -1){
  chxm1023.data = (purchase);
}

if ($request.url.indexOf(hf) != -1){
  chxm1023.data = (purchase);
}

if ($request.url.indexOf(iap) != -1){
  chxm1023.data = {
    "purchaseTime" : 1662685749,
    "giftVip" : 1,
    "isTrialPeriod" : 1,
    "originalTransactionId" : "490001464780901",
    "appleExpireTime" : 4092599349,
    "productId" : "vip_yearly_3daysfree",
    "appleVip" : 1,
    "expireTime" : 4092599349,
    "errorCode" : 0,
    "operationVip" : 1,
    "sandbox" : 0
  };
}
$done({body : JSON.stringify(chxm1023)});
