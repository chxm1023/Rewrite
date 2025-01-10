/*************************************

项目名称：Hyperweb Safari浏览器扩展
下载地址：https://t.cn/A60JTajr
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
https?:\/\/zy6kcqa01a\.execute-api\.us-east-2\.amazonaws\.com\/prod\/verifyReceipt url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Hyperweb.js

[mitm]
hostname = zy6kcqa01a.execute-api.us-east-2.amazonaws.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "autoRenewStatus" : "1",
  "isActive" : true,
  "expireDateMs" : 4092599349000,
  "expirationIntent" : null,
  "productId" : "ai.laso.ios.HyperWeb.yearly.subscription"
};

$done({body : JSON.stringify(chxm1023)});