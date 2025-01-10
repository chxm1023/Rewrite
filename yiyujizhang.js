/*************************************

项目名称：一羽记账
下载地址：https://t.cn/A6Hh0Gsw
更新日期：2024-05-04
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.yiyujizhang\.cn\/yiyujizhang\/vip\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/yiyujizhang.js

[mitm]
hostname = www.yiyujizhang.cn

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.userInfo = {
  ...chxm1023.data.userInfo,
  "vipExpireDate" : 4092599349000,
  "vipType" : 1
};

$done({body : JSON.stringify(chxm1023)});