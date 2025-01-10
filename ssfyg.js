/*************************************

项目名称：实时翻译官
下载地址：https://t.cn/A6jMrVwC
更新日期：2024-1-23
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
http:\/\/new\.xslm333\.xyz\/api\/getUserInfo url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/ssfyg.js

[mitm]
hostname = new.xslm333.xyz

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
  ...chxm1023.data,
  "status" : 1,
  "expire_time" : "9999-12-30 00:00:00",
  "is_member" : 2,
  "cart_num" : 999999
};

$done({body : JSON.stringify(chxm1023)});
