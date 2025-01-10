/*************************************

项目名称：尽简衣橱
下载地址：https://t.cn/A6KyHDkl
更新日期：2024-05-01
脚本作者：chxm1023/@Sheepfj
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/closet\.jinjian\.tech\/api\/v\d\/(users\/profile|apple_app_store\/resolve_receipt|payments\/orders\/sync_from_apple_app_store) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/jjyc.js

[mitm]
hostname = closet.jinjian.tech

*************************************/


var chxm1023 = JSON.parse($response.body);
const user = /users\/profile/;
const receipt = /apple_app_store\/resolve_receipt/;
const payments = /payments\/orders\/sync_from_apple_app_store/;

if(user.test($request.url)){
  chxm1023.data.premium_profile = {
    "apple_app_store_is_auto_renew" : true,
    "type_text" : "永久会员",
    "expired_at" : null,
    "type" : "studio.2players.wardrobe.pro.lifetime",
    "show_subscription_management" : false,
    "apple_app_store_is_receipt_bound" : true
  };
}

if(receipt.test($request.url)){
  chxm1023.data = {
    ...chxm1023.data,
    "type_text" : "永久会员",
    "expired_at" : null,
    "apple_app_store_auto_renew" : true,
    "type" : "studio.2players.wardrobe.pro.lifetime"
  };
}

if(payments.test($request.url)){
  chxm1023 = {
    "message" : "恢复成功",
    "status" : "success"
  };
}

$done({body : JSON.stringify(chxm1023)});
