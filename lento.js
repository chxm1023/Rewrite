/*************************************

项目名称：Lento-壁纸
下载地址：https://t.cn/A6Yyzepk
更新日期：2024-08-06
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/lentoapp\.com:8081\/getUserMemberShipInfo url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/lento.js

[mitm]
hostname = lentoapp.com

*************************************/

var chxm1023 = JSON.parse($response.body);
const isQuanX = typeof $task !== "undefined";

chxm1023 = {
  "meta" : {
    "message" : "获取作者信息成功",
    "code" : 200
  },
  "data" : {
    "paytype" : 1,
    "expiretime" : "null"
  }
};

$done({status: isQuanX ? "HTTP/1.1 200 OK" : 200, body: JSON.stringify(chxm1023)});