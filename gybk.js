/*************************************

项目名称：光影边框
下载地址：https://t.cn/A6QYmcpP
更新日期：2024-07-04
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/prod\.dengziwl\.com\/light-shadow\/member\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/gybk.js

[mitm]
hostname = prod.dengziwl.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.result = {
  ...chxm1023.result,
  "expireDate": "2099-09-09",
  "type": {
    "name": "PAID",
    "display": "付费会员"
  },
  "limitedTimeFree": false
};

$done({body : JSON.stringify(chxm1023)});
