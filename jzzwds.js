/*************************************

项目名称：吉真紫微斗数
下载地址：https://t.cn/A68V37I5
更新日期：2024-07-26
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/zwpp\.wzbz123\.com\/api\/.+\/user\/getzwvipinfo url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/jzzwds.js

[mitm]
hostname = zwpp.wzbz123.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  ...chxm1023,
  "code" : 0,
  "data" : {
    ...chxm1023.data,
    "expires" : "2099-09-09 09:09:09",
    "vipLevel" : 1
  },
  "isSuccess" : true
};

$done({body : JSON.stringify(chxm1023)});