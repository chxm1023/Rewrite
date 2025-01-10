/*************************************

项目名称：Boring Day 壁纸
下载地址：https://t.cn/A6WUmTgo
更新日期：2025-01-09
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/boringday\.api\.neuronlabs\.art\/v\d\/(order\/(premium|restore)|my\/info) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/boring.js

[mitm]
hostname = boringday.api.neuronlabs.art

*************************************/


var ddm = JSON.parse($response.body);

if ($request.url.indexOf('restore') != -1){
  ddm.retData = {
    "expiredAt" : 4092599349000,
    "productID" : "com.neuronlabs.id108",
    "orderNo" : "490000123456789",
    "isSubscribe" : true
  };
}

if ($request.url.indexOf('premium') != -1){
  ddm.retData = [
    {
      "isSubscribe" : true,
      "productID" : "com.neuronlabs.id108"
    }
  ];
}

if ($request.url.indexOf('info') != -1){
  ddm.retData.isVIP = true;
  ddm.retData.expiresAt = 4092599349000;
}

$done({body : JSON.stringify(ddm)});
