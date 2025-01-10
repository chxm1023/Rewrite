/*************************************

项目名称：阳光老挝语
下载地址：https://t.cn/A6QE9nvI
更新日期：2024-07-07
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.ecigrxy\.cn\/api\/user\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/yglwy.js

[mitm]
hostname = www.ecigrxy.cn

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
  ...chxm1023.data,
  "videoVip" : true,
  "translateVipDate" : "2099-09-09 09:09:09",
  "translateCount" : "9999",
  "isDown" : true,
  "videoVipDate" : "2099-09-09 09:09:09",
  "translateVip" : true
};

$done({body : JSON.stringify(chxm1023)});
