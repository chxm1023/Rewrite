/*************************************

项目名称：OtterLife
下载地址：https://t.cn/A68TbbDM
更新日期：2024-08-06
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/otter-api\.codefuture\.top\/v\d\/user\/current url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/otterlife.js

[mitm]
hostname = otter-api.codefuture.top

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
  ...chxm1023.data,
  "vipType" : "lifetime",
  "vipDeadline" : "2099-09-09T09:09:09.000Z",
  "isVip" : true
};

$done({body : JSON.stringify(chxm1023)});